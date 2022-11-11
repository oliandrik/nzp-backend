import { UpdatesService } from 'src/updates/updates.service';
import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { EServiceStatus } from './interfaces/service.interfaces';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    private readonly updService: UpdatesService,
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

  async selectByStatus(status: string) {
    return await this.serviceRepository.find({
      where: { status: EServiceStatus[status] },
    });
  }

  async selectByType(param) {
    return await this.serviceRepository.find({ where: { type: param } });
  }

  async getSelectedInfoProviders(providers: []) {
    return await this.serviceRepository.findBy({
      provider: In(providers),
    });
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

  async updateService(id, service) {
    const foundService = await this.byId(id);

    const oldService = {
      service: { id: id } as Service,

      old_status: foundService.status,
      new_status: service.status,

      old_rate_per: foundService.rate_per,

      new_rate_per:
        service.rate_per !== undefined
          ? service.rate_per
          : foundService.rate_per,
    };

    if (
      oldService.old_status !== oldService.new_status &&
      oldService.old_rate_per == oldService.new_rate_per
    ) {
      await this.updService.create(
        oldService,
        EServiceStatus[oldService.new_status],
      );
    }

    if (
      oldService.old_status == oldService.new_status &&
      oldService.old_rate_per !== oldService.new_rate_per
    ) {
      const mark =
        oldService.old_rate_per < oldService.new_rate_per
          ? 'increased'
          : 'decreased';
      await this.updService.create(oldService, mark);
    }

    return (
      await this.serviceRepository.update(
        { id },
        { ...service, updated_at: new Date() },
      ),
      { message: 'Service was updated' }
    );
  }

  async changeStatus(id, status: string) {
    await this.byId(id);

    return (
      await this.serviceRepository.update(
        { id },
        {
          status: EServiceStatus[status.toUpperCase()],
          updated_at: new Date(),
        },
      ),
      { message: 'Status was changed' }
    );
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
}
