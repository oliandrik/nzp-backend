import * as bcrypt from 'bcrypt';
import { Client } from 'src/clients/entities/client.entity';
import {
  EClientGender,
  EClientRank,
  EClientStatus,
} from 'src/clients/interfaces/client.interfaces';
import { UserDto } from 'src/users/dto/user.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignIn } from './dto/signin.dto';
import { SignUp } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(User) private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUp: SignUp) {
    if (!signUp.terms) {
      throw new BadRequestException(
        'to Register you need to agree to the privacy policy',
      );
    }

    const oldUser = await this.clientRepository.findOneBy({
      email: signUp.email,
    });

    if (oldUser) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }

    const { email, password, username, terms } = signUp;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.clientRepository.create({
      username,
      email,
      password: hashedPassword,
      terms,
      balance: 0.0,
      spent: 0.0,
      discount: 0.0,
      rank: EClientRank.NEW,
      status: EClientStatus.ACTIVE,
      avatar: null,
      gender: EClientGender.OTHER,
      createdAt: new Date(),
      lastAuth: new Date(),
    });

    console.log(user, ' user');

    const tokens = await this.issueTokenPair(String(user.id));

    return (
      this.clientRepository.save(user),
      {
        message: 'User was created',
        user: this.returnUserFields(user),
        ...tokens,
      }
    );
  }

  async signUpAdmin(signUp: UserDto) {
    const oldUser = await this.clientRepository.findOneBy({
      email: signUp.email,
    });

    if (oldUser) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }

    const { email, password } = signUp;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: UserRole[signUp.role],
    });

    const tokens = await this.issueTokenPair(String(user.id));

    return (
      this.userRepository.save(user),
      {
        message: 'sign up andmin',
        user: this.returnUserFields(user),
        ...tokens,
      }
    );
  }

  async signIn(signIn: SignIn) {
    const user = await this.validateUser(signIn);
    const payload = { email: user.email, id: user.id };

    return {
      message: 'Successfully authenticated',
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(signIn: SignIn) {
    const { email, password } = signIn;
    const user =
      (await this.clientRepository.findOne({ where: { email: email } })) ||
      (await this.userRepository.findOne({ where: { email: email } }));

    if (!user) {
      throw new UnauthorizedException(
        'We cannot find account with this email address',
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Check your password');
    }

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { id: userId };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }

  returnUserFields(user) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async changePassword(client, id) {
    const user = await this.clientRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new BadRequestException('Invalid');
    }

    const isValidPassword = await bcrypt.compare(
      client.currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('The current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(client.newPassword, 10);

    return await this.clientRepository
      .createQueryBuilder()
      .update()
      .set({
        password: hashedPassword,
      })
      .where('id = :id', { id: id })
      .execute();
  }
}
