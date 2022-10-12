import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ServiceDto } from './dto/service.dto';

import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getSmth() {
    return 'bla bla bla';
  }

  @Get('enable')
  async getEnableStatus() {
    return await this.servicesService.getEnableStatus();
  }

  @Get('disable')
  async getDisableStatus() {
    return await this.servicesService.getDisableStatus();
  }

  @Get(':type')
  async getType(@Param() type) {
    return await this.servicesService.getType(type);
  }

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

  @Delete(':id')
  async deleteSelectedService(@Param('id') id: number) {
    return await this.servicesService.deleteSelectedService(id);
  }
}
