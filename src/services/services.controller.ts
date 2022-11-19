import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceDto } from './dto/service.dto';
import { EServiceStatus } from './interfaces/service.interfaces';

import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    return await this.servicesService.findAll();
  }

  @Get('select-by-status/:status')
  async selectByStatus(@Param('status') status) {
    if (!EServiceStatus[status.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return await this.servicesService.selectByStatus(status);
  }

  @Get('select-by-type/:type')
  async selectByType(@Param('type') type) {
    return await this.servicesService.selectByType(type);
  }

  @Get('providers')
  async getSelectedInfoProviders(@Body() body) {
    return await this.servicesService.getSelectedInfoProviders(body.providers);
  }

  @Get('get-services-from-provider')
  async getServicesFromProvider(@Body() body) {
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
  async updateService(@Param('id') id, @Body() service: ServiceDto) {
    return await this.servicesService.updateService(id, service);
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
