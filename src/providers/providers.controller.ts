import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProviderDto } from './dto/provider.dto';
import { ProvidersService } from './providers.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async createProvider(@Body() body: ProviderDto) {
    return await this.providersService.create(body);
  }

  @Get()
  async getProviders() {
    return await this.providersService.findAll();
  }

  @Put(':id')
  async updateProvider(@Param('id') id, @Body() body: ProviderDto) {
    return await this.providersService.update(id, body);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.providersService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteProvider(@Param('id') id) {
    return await this.providersService.deleteOne(id);
  }
}
