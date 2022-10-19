import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AverageTime } from './entities/average-time.entity';

@Injectable()
export class AverageTimeService {
  constructor(
    @InjectRepository(AverageTime)
    private readonly bonusRepository: Repository<AverageTime>,
  ) {}

  async update(id, body) {
    return await this.bonusRepository.update(
      { id },
      { ...body, updated_at: new Date() },
    );
  }
}
