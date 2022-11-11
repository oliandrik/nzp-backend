import { ClientDto } from 'src/clients/dto/client.dto';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUp: SignUp) {
    return await this.authService.signUp(signUp);
  }

  @Post('/signup-admin')
  async signUpAdmin(@Body(ValidationPipe) signUp) {
    return await this.authService.signUpAdmin(signUp);
  }

  @Post('/signin')
  async signIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn);
  }

  @Put(':id/change-password')
  async changePassword(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.authService.changePassword(clientDto, id);
  }
  @Put('send-new-password')
  async sendNewPassword(@Body() body: ClientDto) {
    return await this.authService.sendNewPassword(body);
  }

  @Post('/admin-signin')
  async adminSignIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@Request() req) {
    return req.user;
  }
}
