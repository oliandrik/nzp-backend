import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientsService } from 'src/clients/clients.service';
import { UsersService } from 'src/users/users.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private clientService: ClientsService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdkMTEyYjFhZWIwODhmNjUyZDIwMWQiLCJpYXQiOjE2NTIzNjM1NjMsImV4cCI6MTY1MjM2NzE2M30.xcLp-Fg3uh4IQF3OftsK6TWiHSmN5xBJf3E3UA6U44A',
    });
  }

  async validate(payload: any) {
    const user =
      (await this.clientService.byEmail(payload.email)) ||
      (await this.userService.byEmail(payload.email));

    if (!user) {
      throw new UnauthorizedException('Error Authorize');
    }

    return user;
  }
}
