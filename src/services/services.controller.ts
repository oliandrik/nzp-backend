import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceDto } from './dto/service.dto';

import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // SORT
  @Get('enabled')
  @HttpCode(HttpStatus.OK)
  async getEnableStatus() {
    return await this.servicesService.getEnableStatus();
  }

  @Get('disabled')
  @HttpCode(HttpStatus.OK)
  async getDisableStatus() {
    return await this.servicesService.getDisableStatus();
  }

  @Get('providers')
  @HttpCode(HttpStatus.OK)
  async getSelectedInfoProviders(@Body() body) {
    return await this.servicesService.getSelectedInfoProviders(body.providers);
  }

  @Get(':type')
  @HttpCode(HttpStatus.OK)
  async getType(@Param() type) {
    return await this.servicesService.getType(type);
  }

  //
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createService(@Body() service: ServiceDto) {
    return await this.servicesService.createService(service);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async duplicateService(@Param() id) {
    return await this.servicesService.duplicateService(id.id);
  }

  @Delete('bulk-delete')
  @HttpCode(HttpStatus.OK)
  async bulkDelete(@Body() body) {
    // add validation
    return await this.servicesService.bulkDelete(body.ids);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSelectedService(@Param('id') id: number) {
    return await this.servicesService.deleteSelectedService(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateService(@Param('id') id, @Body() service: ServiceDto) {
    return await this.servicesService.updateService(id, service);
  }

  @Put('disabled/:id')
  @HttpCode(HttpStatus.OK)
  async makeDisableService(@Param('id') id) {
    return await this.servicesService.makeDisableService(id);
  }

  @Put('enabled/:id')
  @HttpCode(HttpStatus.OK)
  async makeEnableService(@Param('id') id) {
    return await this.servicesService.makeEnableService(id);
  }
}
