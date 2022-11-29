import { Response } from 'express';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { Repository } from 'typeorm';

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
import { ClientEntityService } from '../client-entity.service';
import { ClientDto } from '../dto/client.dto';
import { EClientGender } from '../interfaces/client.interfaces';

import { ClientsService } from '../services/clients.service';

@Controller('clients')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(ERoles.CLIENT)
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly entityClientService: ClientEntityService,
  ) {}

  @Get('/avatar/:avatar')
  async getAvatar(@Param('avatar') avatar, @Res() res: Response) {
    // res.sendFile(avatar, { root: './uploads/avatars' });
  }

  @Put(':id/set-gender')
  async changeGender(@Body() body, @Param('id') id: number) {
    if (!EClientGender[body.gender.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return await this.clientsService.changeGender(body.gender, id);
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

    await this.entityClientService.byId(user);

    return await this.clientsService.changeAvatar(
      { avatar: file.filename },
      id.id,
    );
  }

  @Put(':id/change-password')
  async changePassword(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.clientsService.changePassword(clientDto, id);
  }

  @Post('create-ref-link')
  async referral(@Body() body, @CurrentUser() user) {
    console.log(user, 'current user', user.id);
    return await this.clientsService.referral(body, user.id);
  }
}
