import * as bcrypt from 'bcrypt';
import { InjectService } from 'src/clients/inject.service';
import {
  EClientGender,
  EClientRank,
  EClientStatus,
} from 'src/clients/interfaces/client.interfaces';
import { AdminClientsService } from 'src/clients/services/admin-clients.service';
import { ClientsService } from 'src/clients/services/clients.service';
import { UsersService } from 'src/users/users.service';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignIn } from './dto/signin.dto';
import { SignUp } from './dto/signup.dto';
import { ERoles } from './interfaces/roles.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminClientService: AdminClientsService,
    private readonly clientService: ClientsService,
    private readonly injectService: InjectService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUp: SignUp) {
    if (!signUp.terms) {
      throw new BadRequestException(
        'to Register you need to agree to the privacy policy',
      );
    }

    await this.clientService.findOldClient(signUp.email);

    const { email, password, username, terms } = signUp;

    const hashedPassword = await bcrypt.hash(password, 10);

    const obj = {
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
    };

    const user = await this.adminClientService.saveClient(obj);

    const tokens = await this.issueTokenPair({
      email: user.email,
      id: user.id,
    });

    return {
      message: 'User was created',
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  // async signUpAdmin(signUp: UserDto) {
  //   const oldUser = await this.clientRepository.findOneBy({
  //     email: signUp.email,
  //   });

  //   if (oldUser) {
  //     throw new BadRequestException(
  //       'User with this email is already in system',
  //     );
  //   }

  //   const { email, password } = signUp;

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = this.userRepository.create({
  //     email,
  //     password: hashedPassword,
  //     role: ERoles[signUp.role],
  //   });

  //   const tokens = await this.issueTokenPair(String(user.id));

  //   return (
  //     this.userRepository.save(user),
  //     {
  //       message: 'sign up andmin',
  //       user: this.returnUserFields(user),
  //       ...tokens,
  //     }
  //   );
  // }

  async signIn(signIn: SignIn) {
    const client = await this.validate(signIn);

    console.log(client, 'client');

    const payload = { email: client.email, id: client.id };

    return {
      message: 'Successfully authenticated',
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validate(signIn: SignIn) {
    const { email, password } = signIn;

    const user =
      (await this.userService.byEmail(email)) ||
      (await this.injectService.byEmail(email));

    if (!user) {
      throw new UnauthorizedException(
        'We cannot find  account with this email address',
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Check your password');
    }

    return user;
  }

  async issueTokenPair(data) {
    const refreshToken = await this.jwtService.sign(data);

    const accessToken = await this.jwtService.sign(data);

    return { refreshToken, accessToken };
  }

  returnUserFields(user) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async sendNewPassword(payload) {
    const client = await this.injectService.byEmail(payload.email);

    if (!client) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
      await this.clientService.updatePassword(client.id, hashedPassword),
      { message: `here you can see your new password ${generatedPassword}` }
    );
  }

  decodedJwtAccessToken(token) {
    return this.jwtService.decode(token);
  }
}
