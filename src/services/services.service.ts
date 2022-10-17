import { In, Repository } from 'typeorm';

import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceDto } from './dto/service.dto';
import { Service } from './entities/service.entity';
import {
  ECancelService,
  EDripFeedService,
  ELinkDuplicateService,
  EModeService,
  EStatusService,
} from './interfaces/service.interfaces';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async byId(id) {
    const categoryId = await this.serviceRepository.findOne({
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

  async createService(service: ServiceDto) {
    // INSERT
    const newServiceCategory = this.serviceRepository.create({
      service_name: service.service_name,
      category: service.category,
      mode: service.mode,
      type: service.type,
      provider: null,
      service: null,
      cancel: service.cancel,
      drip_feed: service.drip_feed,
      rate_per: service.rate_per,
      min_order: service.min_order,
      max_order: service.max_order,
      link_duplicate: service.link_duplicate,
      increment: service.increment,
      overflow: service.overflow,
      status: EStatusService.ENABLED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await (this.serviceRepository.save(newServiceCategory),
    { message: 'created' });
  }

  async duplicateService(id) {
    const foundService = await this.byId(id);
    delete foundService.id;
    const newServiceCategory = this.serviceRepository.create({
      ...foundService,
    });

    return await (this.serviceRepository.save(newServiceCategory),
    { message: 'duplicated' });
  }

  async deleteSelectedService(id) {
    await this.byId(id);

    return (
      await this.serviceRepository.delete(id),
      { message: 'Service category was successfully deleted' }
    );
  }

  async bulkDelete(ids: []) {
    return await this.serviceRepository.delete(ids);
  }

  async getSelectedInfoProviders(providers: []) {
    return await this.serviceRepository.findBy({
      provider: In(providers),
    });
  }

  // SORT
  async getEnableStatus() {
    return await this.serviceRepository.find({
      where: { status: EStatusService.ENABLED },
    });
  }

  async getDisableStatus() {
    return await this.serviceRepository.find({
      where: { status: EStatusService.DISABLED },
    });
  }

  async getType(param) {
    return await this.serviceRepository.find({ where: { type: param } });
  }

  async getMany(types) {
    return await this.serviceRepository.findBy({
      type: In(types),
    });
  }

  async updateService(id, service) {
    await this.byId(id);
    return (
      await this.serviceRepository
        .createQueryBuilder()
        .update()
        .set({
          service_name: service.service_name,
          category: service.category,
          mode: service.mode,
          type: service.type,
          provider: null,
          service: null,
          cancel: service.cancel,
          drip_feed: service.drip_feed,
          rate_per: service.rate_per,
          min_order: service.min_order,
          max_order: service.max_order,
          link_duplicate: service.link_duplicate,
          increment: service.increment,
          overflow: service.overflow,
          status: EStatusService.ENABLED,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Service was updated' }
    );
  }

  async makeDisableService(id) {
    const foundService = await this.byId(id);
    return (
      await this.serviceRepository
        .createQueryBuilder()
        .update()
        .set({
          ...foundService,
          status: EStatusService.DISABLED,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Status was changed' }
    );
  }

  async makeEnableService(id) {
    const foundService = await this.byId(id);
    return (
      await this.serviceRepository
        .createQueryBuilder()
        .update()
        .set({
          ...foundService,
          status: EStatusService.ENABLED,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Status was changed' }
    );
  }
}
