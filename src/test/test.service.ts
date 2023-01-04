import { Like, Repository } from 'typeorm';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly providerRepository: Repository<Test>,
  ) {}

  async findAll(query) {
    const keyword = query.keyword || '';

    const [result, total] = await this.providerRepository.findAndCount({
      where: {
        provider_name: Like('%' + keyword + '%'),
      },
    });

    return {
      data: result,
      total: total,
    };
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

  async byName(providerName) {
    return await this.providerRepository.findOne({
      where: { provider_name: providerName },
    });
  }

  async byUrl(providerUrl) {
    const provider = await this.providerRepository.findOne({
      where: { provider_url: providerUrl },
    });

    if (provider) {
      throw new BadRequestException('This provider already exists');
    }

    return provider;
  }

  async create(body) {
    await this.byUrl(body.provider_url);

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
