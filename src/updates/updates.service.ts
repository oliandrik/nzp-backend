import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './entities/updates.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private readonly updateRepository: Repository<Update>,
  ) {}

  async findAll() {
    return await this.updateRepository.find({
      relations: {
        service: true,
      },
    });
  }

  async create(body, mark) {
    return await this.updateRepository.insert({
      ...body,
      mark: mark.toUpperCase(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
