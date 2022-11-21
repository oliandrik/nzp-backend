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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientDto } from './dto/client.dto';
import { InjectService } from './inject.service';

import { AdminClientsService } from './services/admin-clients.service';
import { ClientsService } from './services/clients.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly adminClientsService: AdminClientsService,
    private readonly injectClientService: InjectService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get()
  async getClients(@Query() query) {
    return await this.adminClientsService.getClients(query);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post('files')
  async exportClientsFile(@Body() body) {
    return await this.adminClientsService.exportClientsFile(body);
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.injectClientService.byId(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.CLIENT)
  @Get('/avatar/:avatar')
  async getAvatar(@Param('avatar') avatar, @Res() res: Response) {
    res.sendFile(avatar, { root: './uploads/avatars' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(ERoles.CLIENT)
  @Put(':id/set-gender')
  async changeGender(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.clientsService.changeGender(clientDto, id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put(':id/set-password')
  async setPassword(@Param('id') id, @Body() body) {
    return await this.adminClientsService.setPassword(id, body.password);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put(':id/set-discount')
  async discount(@Param('id') id, @Body() body) {
    return await this.adminClientsService.discount(id, body.discount);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put(':id/set-status')
  async changeStatus(@Param('id') id, @Body() body) {
    return await this.adminClientsService.changeStatus(id, body.status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post('add-user')
  async addUser(@Body() body) {
    return await this.adminClientsService.addClient(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put(':id/update-user')
  async updateUser(@Param('id') id, @Body() body) {
    return await this.adminClientsService.updateClient(id, body);
  }

  //

  @UseGuards(AuthGuard('jwt'))
  @Roles(ERoles.CLIENT)
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

    await this.injectClientService.byId(user);

    return await this.clientsService.changeAvatar(
      { avatar: file.filename },
      id.id,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.CLIENT)
  @Put(':id/change-password')
  async changePassword(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.clientsService.changePassword(clientDto, id);
  }
}
