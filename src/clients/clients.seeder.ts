import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientSeeder implements Seeder {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  seed(): Promise<any> {
    const clients = DataFactory.createForClass(Client).generate(50);
    return this.clientRepository.insert(clients);
  }

  drop(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
