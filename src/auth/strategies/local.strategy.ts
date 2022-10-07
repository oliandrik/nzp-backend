import { Strategy } from 'passport';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { SignIn } from '../dto/signin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(signIn: SignIn) {
    return this.authService.signIn(signIn);
  }
}
