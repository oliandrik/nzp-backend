import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { EStatusService } from './interfaces/service.interfaces';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async findAll() {
    return await this.serviceRepository.find({
      loadRelationIds: true,
      relations: {
        provider: true,
      },
    });
  }

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
  async createService(body) {
    return await (this.serviceRepository.insert({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    }),
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
      await this.serviceRepository.update(
        { id },
        { ...service, updated_at: new Date() },
      ),
      { message: 'Service was updated' }
    );
  }

  async makeDisableService(id) {
    const foundService = await this.byId(id);

    return (
      await this.serviceRepository.update(
        { id },
        {
          ...foundService,
          status: EStatusService.DISABLED,
          updated_at: new Date(),
        },
      ),
      { message: 'Status was changed' }
    );
  }

  async makeEnableService(id) {
    const foundService = await this.byId(id);

    return (
      await this.serviceRepository.update(
        { id },
        {
          ...foundService,
          status: EStatusService.ENABLED,
          updated_at: new Date(),
        },
      ),
      { message: 'Status was changed' }
    );
  }
}
