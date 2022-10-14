import { ClientDto } from 'src/clients/dto/client.dto';
import { UserDto } from 'src/users/dto/user.dto';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) signUp: SignUp) {
    return await this.authService.signUp(signUp);
  }

  // @Post('/signup-admin')
  // @HttpCode(HttpStatus.CREATED)
  // async signUpAdmin(@Body(ValidationPipe) signUp: UserDto) {
  //   return await this.authService.signUpAdmin(signUp);
  // }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn);
  }

  @Put('/change-password/:id')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.authService.changePassword(clientDto, id);
  }

  @Post('/admin-signin')
  @HttpCode(HttpStatus.OK)
  async adminSignIn(@Body() signIn: SignIn) {
    return await this.authService.signIn(signIn);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  getMe(@Request() req) {
    return req.user;
  }
}
