import * as bcrypt from 'bcrypt';
import {
  EUserGender,
  EUserRank,
  EUserStatus,
} from 'src/users/interfaces/user.interfaces';
import { AdminUsersService } from 'src/users/services/admin-users.service';

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
    private readonly userService: AdminUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUp, query) {
    const oldUser = await this.userService.byEmail(body.email);

    if (oldUser) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const obj = {
      username: body.username,
      email: body.email,
      password: hashedPassword,
      terms: body.terms,
      balance: 0.0,
      spent: 0.0,
      discount: 0.0,
      rank: EUserRank.NEW,
      status: EUserStatus.ACTIVE,
      avatar: null,
      gender: EUserGender.OTHER,
      role: ERoles.USER,
    };

    const user = await this.userService.saveUser(obj);
    let userEmail;
    let userId;

    for (const key of Object.keys(user)) {
      if (key === 'email') {
        userEmail = user[key];
      }
      if (key === 'id') {
        userId = user[key];
      }
    }

    const tokens = await this.issueTokenPair({
      email: userEmail,
      id: userId,
    });

    return {
      message: 'User was created',
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async admin(body) {
    return await this.userService.createAdmin(body);
  }

  async signIn(body: SignIn) {
    const user = await this.validate(body);

    const payload = { email: user.email, id: user.id };

    return {
      message: 'Successfully authenticated',
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validate(body: SignIn) {
    const { email, password } = body;

    const user = await this.userService.byEmail(email);

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
    const client = await this.userService.byEmail(payload.email);
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
      await this.userService.updatePassword(client.id, hashedPassword),
      { message: `here you can see your new password ${generatedPassword}` }
    );
  }

  decodedJwtAccessToken(token) {
    return this.jwtService.decode(token);
  }
}
