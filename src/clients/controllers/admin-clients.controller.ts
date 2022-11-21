import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ERoles } from 'src/auth/interfaces/roles.interfaces';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientEntityService } from '../client-entity.service';

import { AdminClientsService } from '../services/admin-clients.service';

@Controller('clients')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(ERoles.ADMIN)
export class ClientsController {
  constructor(
    private readonly adminClientsService: AdminClientsService,
    private readonly entityClientService: ClientEntityService,
  ) {}

  @Get()
  async getClients(@Query() query) {
    return await this.adminClientsService.getClients(query);
  }

  @Post('files')
  async exportClientsFile(@Body() body) {
    return await this.adminClientsService.exportClientsFile(body);
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.entityClientService.byId(id);
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
}
