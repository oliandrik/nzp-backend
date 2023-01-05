import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  usersRepository() {
    return this.userRepository;
  }

  async byId(id) {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (error) {
      throw new NotFoundException('User with this id not found');
    }
  }

  async byEmail(email) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async byUsername(username) {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }

  async findOldUser(email) {
    const oldUser = await this.byEmail(email);

    if (oldUser) {
      throw new BadRequestException('User with this email already exist');
    }

    return oldUser;
  }
}
