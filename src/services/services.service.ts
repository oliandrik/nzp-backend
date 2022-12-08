import { Provider } from 'src/providers/entities/provider.entity';
import { ProvidersService } from 'src/providers/providers.service';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';
import { UpdatesService } from 'src/updates/updates.service';
import { In, Repository } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalService } from './entities/internal-service.entity';
import { Service } from './entities/service.entity';
import {
  EServiceMode,
  EServiceStatus,
  EServiceType,
} from './interfaces/service.interfaces';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(InternalService)
    private readonly internalServiceRepository: Repository<InternalService>,

    private readonly updService: UpdatesService,
    private readonly providerService: ProvidersService,
    private readonly httpService: HttpService,
  ) {}

  async findAll() {
    return await this.serviceRepository.find({
      relations: {
        provider: true,
        category: true,
        internal_project: true,
      },

      select: {
        provider: {
          id: true,
          provider_name: true,
        },
        category: {
          id: true,
          category_name: true,
        },
        internal_project: {
          id: true,
          service: true,
        },
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

  async getServicesFromProvider(param) {
    const provider = await this.providerService.byName(param);

    if (!provider) {
      throw new BadRequestException('Error');
    }

    const service = await this.callServicesAPI(
      provider.provider_url,
      provider.API_key,
    );

    return service;
  }

  async callServicesAPI(url, key) {
    try {
      const result = await this.httpService
        .get(`${url}?key=${key}&action=services`)
        .toPromise();
      // console.log(result, 'res');
      // console.log(result.data, 'res');
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  async createService(body) {
    const mode: string = body.service.mode.toUpperCase();

    if (
      EServiceMode[mode] === EServiceMode.AUTO &&
      body.internalService === null
    ) {
      throw new BadRequestException('Fill the service');
    }

    let internalService;
    let internalServiceId;

    if (
      EServiceMode[mode] === EServiceMode.AUTO &&
      body.internalService !== null
    ) {
      internalService = await this.internalServiceRepository.insert({
        ...body.internalService,
        type: EServiceType[body.internalService.type.toUpperCase()],
        created_at: new Date(),
        updated_at: new Date(),
      });

      internalServiceId = internalService.raw.insertId;
    }

    return await (this.serviceRepository.insert({
      ...body.service,
      category: { id: body.service.categoryId } as ServiceCategory,
      provider: { id: body.service.providerId } as Provider,
      internal_project:
        EServiceMode[mode] === EServiceMode.AUTO
          ? ({
              id: internalServiceId,
            } as InternalService)
          : null,
      mode: EServiceMode[body.service.mode.toUpperCase()],
      status: EServiceStatus[body.service.status.toUpperCase()],
      type:
        EServiceMode[mode] === EServiceMode.MANUAL
          ? EServiceType[body.service.type.toUpperCase()]
          : EServiceType[body.internalService.type.toUpperCase],
      created_at: new Date(),
      updated_at: new Date(),
    }),
    { message: 'Service was successfully created' });
  }

  async duplicateService(id) {
    const foundService = await this.byId(id);
    delete foundService.id;
    const newServiceCategory = this.serviceRepository.create({
      ...foundService,
    });

    return await (this.serviceRepository.save(newServiceCategory),
    { message: 'Service was successfully duplicated' });
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
      { message: 'Service was successfully updated' }
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
