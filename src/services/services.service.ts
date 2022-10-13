import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceDto } from './dto/service.dto';
import {
  CancelService,
  DripFeedService,
  LinkDuplicateService,
  ModeService,
  Service,
  StatusService,
  TypeService,
} from './entities/service.entity';

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
    const newServiceCategory = this.serviceRepository.create({
      service_name: service.service_name,
      category: service.category,
      mode: ModeService[service.mode],
      type: TypeService[service.type],
      provider: null,
      service: null,
      cancel: CancelService[service.cancel],
      drip_feed: DripFeedService[service.drip_feed],
      rate_per: service.rate_per,
      min_order: service.min_order,
      max_order: service.max_order,
      link_duplicate: LinkDuplicateService[service.link_duplicate],
      increment: service.increment,
      overflow: service.overflow,
      status: StatusService.enable,
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
    console.log(newServiceCategory, 'newServiceCategory');
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
    return await this.serviceRepository.query(
      `DELETE FROM services WHERE id IN (${ids})`,
    );
  }

  async getSelectedInfoProviders(providers: []) {
    const query = await this.serviceRepository.query(
      `SELECT * FROM services WHERE type IN (${providers})`,
    );
    return query;
  }

  // SORT
  async getEnableStatus() {
    return await this.serviceRepository.query(
      'SELECT * FROM services WHERE status = "enable"',
    );
  }

  async getDisableStatus() {
    return await this.serviceRepository.query(
      'SELECT * FROM services WHERE status = "disable"',
    );
  }

  async getType(param) {
    return await this.serviceRepository.query(
      `SELECT * FROM services WHERE type = "${TypeService[param.type]}"`,
    );
  }

  async getMany(types) {
    return await this.serviceRepository.query(
      `SELECT * FROM services WHERE type IN (${types})`,
    );
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
          mode: ModeService[service.mode],
          type: TypeService[service.type],
          provider: null,
          service: null,
          cancel: CancelService[service.cancel],
          drip_feed: DripFeedService[service.drip_feed],
          rate_per: service.rate_per,
          min_order: service.min_order,
          max_order: service.max_order,
          link_duplicate: LinkDuplicateService[service.link_duplicate],
          increment: service.increment,
          overflow: service.overflow,
          status: StatusService.enable,
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
          status: StatusService.disable,
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
          status: StatusService.enable,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Status was changed' }
    );
  }
}
