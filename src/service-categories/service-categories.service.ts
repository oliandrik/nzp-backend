import { Repository } from 'typeorm';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategoryDto } from './dto/service-categories.dto';
import { ServiceCategory } from './entities/service-categories.entity';
import {
  ECategoryPosition,
  ECategoryStatus,
} from './interfaces/service-categories.interfaces';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  async getAllServiceCategories() {
    return await this.serviceCategoryRepository.find();
  }

  async byName(categoryName: string) {
    const category = await this.serviceCategoryRepository.findOne({
      where: { category_name: categoryName },
    });

    if (category) {
      throw new BadRequestException('This category already exists');
    }
    return category;
  }

  async byId(id) {
    const categoryId = await this.serviceCategoryRepository.findOne({
      where: { id: id },
    });

    if (!categoryId) {
      throw new HttpException(
        "This category isn't exists",
        HttpStatus.FORBIDDEN,
      );
    }

    return categoryId;
  }

  async createServiceCategory(category: ServiceCategoryDto, icon) {
    await this.byName(category.category_name);

    return await this.serviceCategoryRepository.insert({
      category_name: category.category_name,
      position: category.position,
      status: ECategoryStatus.ENABLED,
      icon: icon,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateServiceCategory(id, updInfo: ServiceCategoryDto) {
    await this.byId(id);

    return (
      await this.serviceCategoryRepository
        .createQueryBuilder()
        .update()
        .set({
          category_name: updInfo.category_name,
          position: updInfo.position,
          status: updInfo.status,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Service category was updated' }
    );
  }

  async deleteServiceCategory(id) {
    await this.byId(id);

    return (
      await this.serviceCategoryRepository.delete(id),
      { message: 'Service category was successfully deleted' }
    );
  }
}
