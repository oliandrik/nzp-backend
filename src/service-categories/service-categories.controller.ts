import { diskStorage } from 'multer';

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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiceCategoryDto } from './dto/service-categories.dto';
import { ServiceCategory } from './entities/service-categories.entity';

import { ServiceCategoriesService } from './service-categories.service';

@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(
    private readonly serviceCategoriesService: ServiceCategoriesService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllServiceCategories(): Promise<ServiceCategory[]> {
    return await this.serviceCategoriesService.getAllServiceCategories();
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './uploads/categoryIcons',
        filename: (req, icon, cb) => {
          const name: string = icon.originalname.split('.')[0];
          const fileExtension = icon.originalname.split('.');
          const newFilename: string =
            name.split(' ').join('_') +
            '_' +
            Date.now() +
            '.' +
            fileExtension[fileExtension.length - 1];
          cb(null, newFilename);
        },
      }),
    }),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createServiceCategory(
    @Body() category: ServiceCategoryDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    let checkIcon;

    if (icon == undefined) {
      checkIcon = null;
    } else {
      checkIcon = icon.filename;
    }
    return await this.serviceCategoriesService.createServiceCategory(
      category,
      checkIcon,
    );
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteServiceCategory(@Param('id') id: number) {
    return await this.serviceCategoriesService.deleteServiceCategory(id);
  }
}
