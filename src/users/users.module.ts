import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersController } from './controllers/admin-users.controller';
import { User } from './entities/user.entity';

import { AdminUsersService } from './services/admin-users.service';
import { UserEntityService } from './services/user-entity.service';
import { UsersService } from './services/client-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, UsersService, UserEntityService],
  exports: [AdminUsersService],
})
export class UsersModule {}
