import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class InjectService {
  constructor(
    @InjectRepository(Client)
    public readonly clientRepository: Repository<Client>,
  ) {}

  async byEmail(email) {
    const client = await this.clientRepository.findOne({
      where: { email: email },
    });

    return client;
  }

  async byId(id) {
    const client = await this.clientRepository.findOne({
      where: { id: id },
    });

    if (!client) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return client;
  }
}
