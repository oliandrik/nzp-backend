import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MultiCurrencyService } from './multi-currency.service';

@Controller('multi-currency')
export class MultiCurrencyController {
  constructor(private readonly multiCurrencyService: MultiCurrencyService) {}

  @Get()
  async getAll() {
    return await this.multiCurrencyService.findAll();
  }

  @Post()
  async createCurrency(@Body() body) {
    return await this.multiCurrencyService.create(body);
  }

  @Put('bulk-update')
  async bulkUpdate(@Body() body) {
    return await this.multiCurrencyService.multipleDiactivation(body.ids);
  }

  @Put(':id')
  async updateCurrency(@Param('id') id, @Body() body) {
    return await this.multiCurrencyService.update(id, body);
  }

  @Delete(':id')
  async deleteCurrency(@Param('id') id) {
    return await this.multiCurrencyService.deleteOne(id);
  }
}
