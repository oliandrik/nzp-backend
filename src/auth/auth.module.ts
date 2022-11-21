import { ClientsModule } from 'src/clients/clients.module';
import { ClientsService } from 'src/clients/services/clients.service';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    PassportModule,
    JwtModule.register({
      secret:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdkMTEyYjFhZWIwODhmNjUyZDIwMWQiLCJpYXQiOjE2NTIzNjM1NjMsImV4cCI6MTY1MjM2NzE2M30.xcLp-Fg3uh4IQF3OftsK6TWiHSmN5xBJf3E3UA6U44A',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
