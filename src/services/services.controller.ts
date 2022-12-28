import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiceDto } from './dto/service.dto';
import { EServiceStatus } from './interfaces/service.interfaces';

import { ServicesService } from './services.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(ERoles.ADMIN)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(@Query() query) {
    return await this.servicesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(id);
    return await this.servicesService.findOne(id);
  }

  @Post('get-services-from-provider')
  async getServicesFromProvider(@Body() body) {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException('Error');
    }
    return await this.servicesService.getServicesFromProvider(body.provider);
  }

  @Post()
  async createService(@Body() service: ServiceDto) {
    return await this.servicesService.createService(service);
  }

  @Post(':id')
  async duplicateService(@Param() id) {
    return await this.servicesService.duplicateService(id.id);
  }

  @Put(':id')
  async updateService(@Param('id') id: number, @Body() body: ServiceDto) {
    return await this.servicesService.updateService(id, body);
  }

  @Put(':id/change-status')
  async changEServiceStatus(@Param('id') id, @Body() body) {
    if (!EServiceStatus[body.status.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return await this.servicesService.changeStatus(id, body.status);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.servicesService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteSelectedService(@Param('id') id: number) {
    return await this.servicesService.deleteSelectedService(id);
  }
}
