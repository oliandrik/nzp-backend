import * as bcrypt from 'bcrypt';
import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { Like } from 'typeorm';

import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserEntityService } from './user-entity.service';
import {
  EUserGender,
  EUserRank,
  EUserStatus,
} from '../interfaces/user.interfaces';

@Injectable()
export class AdminUsersService {
  constructor(private readonly userEntity: UserEntityService) {}

  async byId(id) {
    return await this.userEntity.byId(id);
  }

  async byEmail(email) {
    return await this.userEntity.byEmail(email);
  }

  async findOldUser(email) {
    return await this.userEntity.findOldUser(email);
  }

  async findAll(query) {
    const clientsPerPage = query.take || 20;
    const page = query.page || 1;
    const skip = (page - 1) * clientsPerPage;
    const keyword = query.keyword || '';
    const status: string = query.status || '';
    const sortByField = query.sortBy || 'created_at';
    const sortDirection = query.sortDir || 'ASC';
    const [result, total] = await this.userEntity
      .usersRepository()
      .findAndCount({
        where: {
          username: Like('%' + keyword + '%'),
          status: EUserStatus[status.toUpperCase()],
        },
        take: clientsPerPage,
        skip: skip,
        order: {
          [sortByField]: sortDirection,
        },
      });
    return {
      data: result,
      total: total,
    };
  }

  async saveUser(@Body() data) {
    const user = await this.userEntity.usersRepository().create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.userEntity.usersRepository().save(user);
    return user;
  }

  async addAdmin(body) {
    await this.findOldUser(body.email);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const obj = {
      username: body.username,
      email: body.email,
      password: hashedPassword,
      terms: true,
      role: !body.role ? ERoles.ADMIN : body.role,
      balance: 0.0,
      spent: 0.0,
      discount: 0.0,
      rank: EUserRank.NEW,
      status: EUserStatus.ACTIVE,
      avatar: null,
      gender: EUserGender.OTHER,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return (
      await this.userEntity.usersRepository().insert(obj),
      { message: 'User was successfully added' }
    );
  }

  async addUser(body) {
    await this.findOldUser(body.email);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const obj = {
      username: body.username,
      email: body.email,
      password: hashedPassword,
      terms: true,
      role: ERoles.USER,
      balance: 0.0,
      spent: 0.0,
      discount: 0.0,
      rank: EUserRank.NEW,
      status: EUserStatus.ACTIVE,
      avatar: null,
      gender: EUserGender.OTHER,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return (
      await this.userEntity.usersRepository().insert(obj),
      { message: 'User was successfully added' }
    );
  }

  async createAdmin(body) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    return await this.userEntity.usersRepository().insert({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      terms: true,
      role: ERoles.ADMIN,
      balance: 0.0,
      spent: 0.0,
      discount: 0.0,
      rank: EUserRank.NEW,
      status: EUserStatus.ACTIVE,
      avatar: null,
      gender: EUserGender.OTHER,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async updatePassword(id, hashedPassword) {
    return (
      await this.userEntity
        .usersRepository()
        .update({ id }, { password: hashedPassword, updated_at: new Date() }),
      { message: 'Password  was successfully updated' }
    );
  }

  async updateUser(id, body) {
    const user = await this.userEntity.usersRepository().findOne({
      where: { id: id.id },
    });
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    await this.validateByEmailAndUsername(body);

    return (
      await this.userEntity.usersRepository().update(
        { id },
        {
          username: body.username,
          email: body.email,
          updated_at: new Date(),
        },
      ),
      { message: 'User  was successfully updated' }
    );
  }

  async setPassword(id, password) {
    await this.byId(id);
    const hashedPassword = await bcrypt.hash(password, 10);
    return (
      await this.userEntity
        .usersRepository()
        .update({ id }, { password: hashedPassword, updated_at: new Date() }),
      { message: 'Password  was successfully updated' }
    );
  }

  async discount(id, discount) {
    await this.byId(id);
    return (
      await this.userEntity
        .usersRepository()
        .update({ id }, { discount, updated_at: new Date() }),
      { message: 'Discount  was successfully updated' }
    );
  }

  async changeStatus(id, status: string) {
    await this.byId(id);
    if (!EUserStatus[status.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }
    return (
      await this.userEntity.usersRepository().update(
        { id },
        {
          status: EUserStatus[status.toUpperCase()],
          updated_at: new Date(),
        },
      ),
      { message: 'Status  was successfully updated' }
    );
  }

  async bulkDelete(ids: []) {
    return (
      await this.userEntity.usersRepository().delete(ids),
      { message: 'Users were successfully deleted' }
    );
  }

  async deleteOne(id: number) {
    await this.byId(id);
    return (
      await this.userEntity.usersRepository().delete(id),
      { message: 'User was successfully deleted' }
    );
  }

  async validateByEmailAndUsername(data) {
    const oldClientByEmail = await this.userEntity.usersRepository().findOneBy({
      email: data.email,
    });
    const oldClientByUsername = await this.userEntity
      .usersRepository()
      .findOneBy({
        username: data.username,
      });
    if (oldClientByEmail && oldClientByUsername) {
      throw new BadRequestException(
        'Please enter a different email address and username',
      );
    }
    if (oldClientByEmail) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }
    if (oldClientByUsername) {
      throw new BadRequestException(
        'User with this username is already in system',
      );
    }
    return { oldClientByEmail, oldClientByUsername };
  }
}
