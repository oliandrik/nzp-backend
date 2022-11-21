import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { InjectService } from '../inject.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly injectClientService: InjectService,
  ) {}

  async findOldClient(email) {
    const oldClient = await this.clientRepository.findOne({
      where: { email: email },
    });

    if (oldClient) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }

    return oldClient;
  }

  async byUsername(username) {
    const client = await this.clientRepository.findOne({
      where: { username: username },
    });

    if (client) {
      throw new BadRequestException(
        'User with this username is already in system',
      );
    }

    return client;
  }

  async changeGender(data, id) {
    await this.injectClientService.byId(id);

    return await this.clientRepository.update(
      { id },
      { gender: data.gender, updated_at: new Date() },
    );
  }

  async changeAvatar(avatar, id) {
    const findUser = await this.injectClientService.byId(id);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');

    if (findUser.avatar !== null) {
      fs.unlink(`./uploads/avatars/${findUser.avatar}`, function (err) {
        if (err) {
          throw err;
        } else {
          console.log('Successfully deleted the file.');
        }
      });
      delete findUser.avatar;
    }

    return (
      await this.clientRepository.update(
        { id },
        { avatar: avatar.avatar, updated_at: new Date() },
      ),
      { message: 'Avatar  was successfully updated' }
    );
  }

  async updatePassword(id, hashedPassword) {
    return (
      await this.clientRepository.update(
        { id },
        { password: hashedPassword, updated_at: new Date() },
      ),
      { message: 'Password  was successfully updated' }
    );
  }

  async changePassword(client, id) {
    const user = await this.clientRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new BadRequestException('Invalid');
    }

    const isValidPassword = await bcrypt.compare(
      client.currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('The current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(client.newPassword, 10);

    return (
      await this.clientRepository.update(
        { id },
        { password: hashedPassword, updated_at: new Date() },
      ),
      { message: `Your password was successfully updated` }
    );
  }
}
