import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntityService } from './user-entity.service';
import { EUserGender } from '../interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly userEntity: UserEntityService) {}

  async byUsername(username) {
    const user = await this.userEntity.byUsername(username);

    if (user) {
      throw new BadRequestException(
        'User with this username is already in system',
      );
    }

    return user;
  }

  async changeGender(gender: string, id) {
    await this.userEntity.byId(id);

    return (
      await this.userEntity.usersRepository().update(
        { id },
        {
          gender: EUserGender[gender.toUpperCase()],
          updated_at: new Date(),
        },
      ),
      { message: `User's gender was successfully updated` }
    );
  }

  async changeAvatar(avatar, id) {
    const findUser = await this.userEntity.byId(id);

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
      await this.userEntity
        .usersRepository()
        .update({ id }, { avatar: avatar.avatar, updated_at: new Date() }),
      { message: 'Avatar  was successfully updated' }
    );
  }

  async updatePassword(id, hashedPassword) {
    return (
      await this.userEntity
        .usersRepository()
        .update({ id }, { password: hashedPassword, updated_at: new Date() }),
      { message: 'Password  was successfully updated' }
    );
  }

  async changePassword(client, id) {
    const user = await this.userEntity.byId(id);

    const isValidPassword = await bcrypt.compare(
      client.currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('The current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(client.newPassword, 10);

    return (
      await this.userEntity
        .usersRepository()
        .update({ id }, { password: hashedPassword, updated_at: new Date() }),
      { message: `Your password was successfully updated` }
    );
  }

  // async referral(body, userId) {
  //   return await this.entityClientService.getReferralSystemRepository().insert({
  //     referral_link: body.referral_link,
  //     client: { id: userId } as Client,
  //     created_at: new Date(),
  //   });
  // }

  // async findReferral(link) {
  //   const referral = await this.entityClientService
  //     .getReferralSystemRepository()
  //     .findOne({
  //       where: { referral_link: link },
  //       loadRelationIds: true,
  //     });

  //   if (!referral) {
  //     throw new BadRequestException('Invalid');
  //   }

  //   return referral;
  // }
}
