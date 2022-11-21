import { Response } from 'express';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

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
  UseInterceptors,
} from '@nestjs/common';
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

  // @Roles(ERoles.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getClients(@Query() query) {
    return await this.adminClientsService.getClients(query);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @HasRoles(ERoles.ADMIN)
  @Post('files')
  async exportClientsFile(@Body() body) {
    return await this.adminClientsService.exportClientsFile(body);
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.injectClientService.byId(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/avatar/:avatar')
  async getAvatar(@Param('avatar') avatar, @Res() res: Response) {
    res.sendFile(avatar, { root: './uploads/avatars' });
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

    await this.injectClientService.byId(user);

    return await this.clientsService.changeAvatar(
      { avatar: file.filename },
      id.id,
    );
  }

  @Put(':id/set-password')
  async setPassword(@Param('id') id, @Body() body) {
    return await this.adminClientsService.setPassword(id, body.password);
  }

  @Put(':id/set-discount')
  async discount(@Param('id') id, @Body() body) {
    return await this.adminClientsService.discount(id, body.discount);
  }

  @Put(':id/set-status')
  async changeStatus(@Param('id') id, @Body() body) {
    return await this.adminClientsService.changeStatus(id, body.status);
  }

  @Post('add-user')
  async addUser(@Body() body) {
    return await this.adminClientsService.addClient(body);
  }

  @Put(':id/update-user')
  async updateUser(@Param('id') id, @Body() body) {
    return await this.adminClientsService.updateClient(id, body);
  }

  @Put(':id/change-password')
  async changePassword(@Body() clientDto: ClientDto, @Param('id') id: number) {
    return await this.clientsService.changePassword(clientDto, id);
  }
}
