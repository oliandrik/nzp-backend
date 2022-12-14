import { ClientDto } from 'src/clients/dto/client.dto';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignIn } from './dto/signin.dto';
import { SignUp } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) body: SignUp, @Query() query) {
    if (!body.terms) {
      throw new BadRequestException(
        'to Register you need to agree to the privacy policy',
      );
    }
    return await this.authService.signUp(body, query);
  }

  @Post('signin')
  async signIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn);
  }

  @Post('create-admin')
  async createAdmin(@Body() body) {
    return await this.authService.admin(body);
  }

  @Post('admin-signin')
  async adminSignIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn);
  }

  @Put('send-new-password')
  async sendNewPassword(@Body() body: ClientDto) {
    return await this.authService.sendNewPassword(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@Request() req) {
    return req.user;
  }
}
