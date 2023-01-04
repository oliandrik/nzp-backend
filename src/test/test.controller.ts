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
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async getProviders(@Query() query) {
    return await this.testService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.testService.byId(id);
  }

  @Post()
  async createProvider(@Body() body) {
    return await this.testService.create(body);
  }

  @Put(':id')
  async updateProvider(@Param('id') id, @Body() body) {
    return await this.testService.update(id, body);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.testService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteProvider(@Param('id') id) {
    return await this.testService.deleteOne(id);
  }
}
