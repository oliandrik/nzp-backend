import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async findAll() {
    return await this.providerRepository.find();
  }

  async byId(id) {
    const provider = await this.providerRepository.findOne({
      where: { id: id },
    });

    if (!provider) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return provider;
  }

  async create(body) {
    return await this.providerRepository.insert({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async update(id, body) {
    return (
      await this.providerRepository.update(
        { id },
        {
          ...body,
          updated_at: new Date(),
        },
      ),
      { message: 'Provider was successfully updated' }
    );
  }

  async deleteOne(id) {
    return (
      await this.providerRepository.delete(id),
      { message: 'Provider was successfully deleted' }
    );
  }

  async bulkDelete(ids: []) {
    return (
      await this.providerRepository.delete(ids),
      { message: 'Providers were successfully deleted' }
    );
  }
}
