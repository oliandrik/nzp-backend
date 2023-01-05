import { ERoles } from 'src/auth/interfaces/roles.interfaces';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AdminUsersService } from '../services/admin-users.service';

@Controller('users')
export class AdminUsersController {
  constructor(private readonly usersService: AdminUsersService) {}

  @Get()
  async getUsers(@Query() query) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.usersService.byId(id);
  }

  @Post('add-admin')
  async addAdmin(@Body() body) {
    if (body.role !== undefined && !ERoles[body.role.toUpperCase()]) {
      throw new BadRequestException('Invalid role');
    }

    return await this.usersService.addAdmin(body);
  }

  @Post('add-user')
  async addUser(@Body() body) {
    return await this.usersService.addUser(body);
  }

  @Put(':id/update-user')
  async updateUser(@Param('id') id, @Body() body) {
    return await this.usersService.updateUser(id, body);
  }

  @Put(':id/set-password')
  async setPassword(@Param('id') id, @Body() body) {
    return await this.usersService.setPassword(id, body.password);
  }

  @Put(':id/set-discount')
  async discount(@Param('id') id, @Body() body) {
    return await this.usersService.discount(id, body.discount);
  }

  @Put(':id/set-status')
  async changeStatus(@Param('id') id, @Body() body) {
    return await this.usersService.changeStatus(id, body.status);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.usersService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id) {
    return await this.usersService.deleteOne(id);
  }
}
