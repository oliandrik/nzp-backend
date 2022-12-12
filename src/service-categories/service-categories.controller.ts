import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ERoles } from 'src/auth/interfaces/roles.interfaces';

import {
  Body,
  Controller,
  Delete,
  Get,
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

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(ERoles.ADMIN)
@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(
    private readonly serviceCategoriesService: ServiceCategoriesService,
  ) {}

  @Get()
  async findAllServiceCategories(): Promise<ServiceCategory[]> {
    return await this.serviceCategoriesService.findAll();
  }

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
    return await this.serviceCategoriesService.create(category, checkIcon);
  }

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
  @Put(':id')
  async updateServiceCategory(
    @Param('id') id: number,
    @Body() body,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    let checkIcon;

    if (icon == undefined) {
      checkIcon = null;
    } else {
      checkIcon = icon.filename;
    }

    return await this.serviceCategoriesService.update(id, body, checkIcon);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteServiceCategory(@Param('id') id: number) {
    return await this.serviceCategoriesService.delete(id);
  }
}
