import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategoryDto } from './dto/service-categories.dto';
import {
  CategoryPosition,
  CategoryStatus,
  ServiceCategory,
} from './entity/service-categories.entity';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  async getAllServiceCategories() {
    return await this.serviceCategoryRepository.find();
  }

  async findServiceCategory(category, check) {
    let isServiceCategory;

    console.log(category, 'cats');
    switch (check) {
      case 'by_name':
        isServiceCategory = await this.serviceCategoryRepository.findOne({
          where: { category_name: category.category_name },
        });
        break;
      case 'by_id':
        isServiceCategory = await this.serviceCategoryRepository.findOne({
          where: { id: category.id || category },
        });
        break;
      default:
        break;
    }

    if (check === 'by_name' && isServiceCategory) {
      throw new BadRequestException('This category already exists');
    }

    if (check === 'by_id' && !isServiceCategory) {
      throw new BadRequestException("This category isn't exists");
    }

    return isServiceCategory;
  }

  async createServiceCategory(category: ServiceCategoryDto) {
    await this.findServiceCategory(category, 'by_id');

    const newServiceCategory = this.serviceCategoryRepository.create({
      category_name: category.category_name,
      position: CategoryPosition[category.position],
      status: CategoryStatus.enable,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.serviceCategoryRepository.save(newServiceCategory);
  }

  async updateServiceCategory(id, updInfo: ServiceCategoryDto) {
    await this.findServiceCategory(id, 'by_id');

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
      { message: 'service category was updated' }
    );
  }

  async deleteServiceCategory(id) {
    await this.findServiceCategory(id, 'by_id');
    return (
      await this.serviceCategoryRepository.delete(id),
      { message: 'successfully deleted' }
    );
  }
}
