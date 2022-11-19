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
  Query,
  Req,
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

  // @Roles(ERoles.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getClients(@Query() query) {
    return await this.clientsService.getClients(query);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/avatar/:avatar')
  async getAvatar(@Param('avatar') avatar, @Res() res: Response) {
    res.sendFile(avatar, { root: './uploads/avatars' });
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.ADMIN)
  @Get('asc/:param')
  async getClientsInfoByASC(@Param() param) {
    return await this.clientsService.sortByASC(param.param);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.ADMIN)
  @Get('desc/:param')
  async getClientsInfoByDESC(@Param() param) {
    return await this.clientsService.sortByDESC(param.param);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.ADMIN)
  @Get('status/:param')
  async getClientsByStatus(@Param() param) {
    return await this.clientsService.getByStatus(param.param);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.ADMIN)
  @Post('files')
  async exportClientsFile(@Body() body) {
    return await this.clientsService.exportClientsFile(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.CLIENT)
  @Put(':id/set-gender')
  async changeGender(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.clientsService.changeGender(clientDto, id);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.CLIENT)
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

    await this.clientsService.byId(user);

    return await this.clientsService.changeAvatar(
      { avatar: file.filename },
      id.id,
    );
  }

  @Put(':id/set-password')
  async setPassword(@Param('id') id, @Body() body) {
    return await this.clientsService.setPassword(id, body.password);
  }

  @Put(':id/set-discount')
  async discount(@Param('id') id, @Body() body) {
    return await this.clientsService.discount(id, body.discount);
  }

  @Put(':id/set-status')
  async changeStatus(@Param('id') id, @Body() body) {
    return await this.clientsService.changeStatus(id, body.status);
  }
}
