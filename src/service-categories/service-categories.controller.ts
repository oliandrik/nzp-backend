import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiceCategoryDto } from './dto/service-categories.dto';

import { ServiceCategoriesService } from './service-categories.service';

@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(
    private readonly serviceCategoriesService: ServiceCategoriesService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllServiceCategories() {
    return await this.serviceCategoriesService.getAllServiceCategories();
  }

  @Post()
  async createServiceCategory(@Body() category: ServiceCategoryDto) {
    return await this.serviceCategoriesService.createServiceCategory(category);
  }

  @Put(':id')
  async updateServiceCategory(
    @Param('id') id: number,
    @Body() updInfo: ServiceCategoryDto,
  ) {
    return await this.serviceCategoriesService.updateServiceCategory(
      id,
      updInfo,
    );
  }

  @Delete(':id')
  async deleteServiceCategory(@Param('id') id: number) {
    return await this.serviceCategoriesService.deleteServiceCategory(id);
  }
}
