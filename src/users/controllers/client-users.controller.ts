import { Response } from 'express';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ERoles } from 'src/auth/interfaces/roles.interfaces';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { EUserGender } from '../interfaces/user.interfaces';

import { UsersService } from '../services/client-users.service';
import { UserEntityService } from '../services/user-entity.service';

@Roles(ERoles.USER)
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userEntity: UserEntityService,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userEntity.byId(id);
  }

  @Get('/avatar/:avatar')
  async getAvatar(@Param('avatar') avatar, @Res() res: Response) {
    // res.sendFile(avatar, { root: './uploads/avatars' });
  }

  @Put(':id/set-gender')
  async changeGender(@Body() body, @Param('id') id: number) {
    if (!EUserGender[body.gender.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return await this.usersService.changeGender(body.gender, id);
  }

  @Put(':id/set-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const name: string = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.');
          const newFilename: string =
            name.split(' ').join('_') +
            '_' +
            Date.now() +
            '.' +
            fileExtension[fileExtension.length - 1];
          cb(null, newFilename);
        },
      }),
    }),
  )
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param() id,
    @CurrentUser() user,
  ) {
    if (!file) {
      throw new BadRequestException('Error');
    }

    await this.userEntity.byId(user);

    return await this.usersService.changeAvatar(
      { avatar: file.filename },
      id.id,
    );
  }

  @Put(':id/change-password')
  async changePassword(@Body() clientDto, @Param('id') id: number) {
    return await this.usersService.changePassword(clientDto, id);
  }

  // @Post('create-ref-link')
  // async referral(@Body() body, @CurrentUser() user) {
  //   console.log(user, 'current user', user.id);
  //   return await this.usersService.referral(body, user.id);
  // }
}
