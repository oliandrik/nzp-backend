import { Repository } from 'typeorm';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll() {
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

  async create(body, icon) {
    await this.byName(body.category_name);

    const position: string = body.position.toUpperCase();
    const status: string = body.status.toUpperCase();
    return (
      await this.serviceCategoryRepository.insert({
        category_name: body.category_name,
        position: ECategoryPosition[position],
        status: ECategoryStatus[status],
        icon: icon,
        created_at: new Date(),
        updated_at: new Date(),
      }),
      { message: 'Service category was created' }
    );
  }

  async update(id, body, icon) {
    await this.byId(id);

    const position: string = body.position.toUpperCase();
    const status: string = body.status.toUpperCase();

    return (
      await this.serviceCategoryRepository.update(
        { id },
        {
          ...body,
          position: ECategoryPosition[position],
          status: ECategoryStatus[status],
          icon: icon,
          updated_at: new Date(),
        },
      ),
      { message: 'Service category was updated' }
    );
  }

  async delete(id) {
    await this.byId(id);

    return (
      await this.serviceCategoryRepository.delete(id),
      { message: 'Service category was successfully deleted' }
    );
  }
}
