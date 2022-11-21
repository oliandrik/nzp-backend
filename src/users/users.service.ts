import { Repository } from 'typeorm';

import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async byEmail(data) {
    const client = await this.userRepository.findOne({
      where: { email: data },
    });

    if (!client) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return client;
  }

  async byId(id) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOldUser(email) {
    const oldUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (oldUser) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }

    return oldUser;
  }

  async saveUser(@Body() data) {
    const client = await this.userRepository.create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      lastAuth: new Date(),
    });
    return await this.userRepository.save(client);
  }
}
