import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiCurrency } from './entities/multi-currency.entity';

@Injectable()
export class MultiCurrencyService {
  constructor(
    @InjectRepository(MultiCurrency)
    private readonly multiCurrencyRepository: Repository<MultiCurrency>,
  ) {}

  async findAll() {
    return await this.multiCurrencyRepository.find();
  }

  async create(body) {
    return await this.multiCurrencyRepository.insert({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async update(id, body) {
    return await this.multiCurrencyRepository.update(
      { id },
      { ...body, updated_at: new Date() },
    );
  }

  async multipleDiactivation(ids) {
    return await this.multiCurrencyRepository
      .createQueryBuilder()
      .update(MultiCurrency)
      .set({
        activation: 2,
      })
      .where('id IN (:ids)', { ids: ids })
      .execute();
  }

  async deleteOne(id) {
    return await this.multiCurrencyRepository.delete(id);
  }
}
