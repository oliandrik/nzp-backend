import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientEntityService } from '../client-entity.service';
import { Client } from '../entities/client.entity';
import { EClientGender } from '../interfaces/client.interfaces';

@Injectable()
export class ClientsService {
  constructor(private readonly entityClientService: ClientEntityService) {}

  async findOldClient(email) {
    const oldClient = await this.entityClientService
      .getClientRepository()
      .findOne({
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
    const client = await this.entityClientService
      .getClientRepository()
      .findOne({
        where: { username: username },
      });

    if (client) {
      throw new BadRequestException(
        'User with this username is already in system',
      );
    }

    return client;
  }

  async changeGender(gender: string, id) {
    await this.entityClientService.byId(id);

    return (
      await this.entityClientService.getClientRepository().update(
        { id },
        {
          gender: EClientGender[gender.toUpperCase()],
          updated_at: new Date(),
        },
      ),
      { message: `User's gender was successfully updated` }
    );
  }

  async changeAvatar(avatar, id) {
    const findUser = await this.entityClientService.byId(id);

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
      await this.entityClientService
        .getClientRepository()
        .update({ id }, { avatar: avatar.avatar, updated_at: new Date() }),
      { message: 'Avatar  was successfully updated' }
    );
  }

  async updatePassword(id, hashedPassword) {
    return (
      await this.entityClientService
        .getClientRepository()
        .update({ id }, { password: hashedPassword, updated_at: new Date() }),
      { message: 'Password  was successfully updated' }
    );
  }

  async changePassword(client, id) {
    const user = await this.entityClientService.getClientRepository().findOne({
      where: { id: id },
    });

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
      await this.entityClientService
        .getClientRepository()
        .update({ id }, { password: hashedPassword, updated_at: new Date() }),
      { message: `Your password was successfully updated` }
    );
  }

  async referral(body, userId) {
    return await this.entityClientService.getReferralSystemRepository().insert({
      referral_link: body.referral_link,
      client: { id: body.clientId } as Client,
      created_at: new Date(),
    });
  }
}
