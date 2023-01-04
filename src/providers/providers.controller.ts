import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProviderDto } from './dto/provider.dto';
import { ProvidersService } from './providers.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  async getProviders(@Query() query) {
    return await this.providersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.providersService.byId(id);
  }

  @Post()
  async createProvider(@Body() body: ProviderDto) {
    return await this.providersService.create(body);
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
