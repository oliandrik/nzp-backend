import { Response } from 'express';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('/change-gender/:id')
  async changeGender(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.clientsService.changeGender(clientDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/change-avatar/:id')
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
    @Param() id: number,
    @CurrentUser() user,
  ) {
    if (!file) {
      throw new BadRequestException('Error');
    }

    await this.clientsService.findUserById(user);

    return await this.clientsService.changeAvatar(
      { avatar: file.filename },
      id,
    );
  }

  @Get('/avatar/:avatar')
  async getAvatar(@Param('avatar') avatar, @Res() res: Response) {
    res.sendFile(avatar, { root: './uploads/avatars' });
  }
}
