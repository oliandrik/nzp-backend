import * as bcrypt from 'bcrypt';
import { Client } from 'src/clients/entities/client.entity';
import {
  EClientGender,
  EClientRank,
  EClientStatus,
} from 'src/clients/interfaces/client.interfaces';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
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
import { ERoles } from './interfaces/roles.interfaces';

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
      role: ERoles.CLIENT,
      created_at: new Date(),
      updated_at: new Date(),
      lastAuth: new Date(),
    });

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
      role: ERoles[signUp.role],
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
    const client = await this.validate(signIn);
    const payload = { email: client.email, id: client.id };

    return {
      message: 'Successfully authenticated',
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validate(signIn: SignIn) {
    const { email, password } = signIn;
    const user =
      (await this.clientRepository.findOne({
        where: { email: email },
      })) || (await this.userRepository.findOne({ where: { email: email } }));

    if (!user) {
      throw new UnauthorizedException(
        'We cannot find person account with this email address',
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
    const refreshToken = await this.jwtService.signAsync(data);

    const accessToken = await this.jwtService.signAsync(data);

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

    return (
      await this.clientRepository.update(
        { id },
        { password: hashedPassword, updated_at: new Date() },
      ),
      { message: `Your password was successfully updated` }
    );
  }

  async sendNewPassword(payload) {
    const user = await this.clientRepository.findOne({
      where: { email: payload.email },
    });

    if (!user) {
      throw new BadRequestException('User is not found');
    }

    let generatedPassword = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const charactersLength = characters.length;
    for (let i = 0; i < 9; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    return (
      await this.clientRepository.update(
        { id: user.id },
        { password: hashedPassword, updated_at: new Date() },
      ),
      { message: `here you can see your new password ${generatedPassword}` }
    );
  }

  decodedJwtAccessToken(token) {
    return this.jwtService.decode(token);
  }
}
