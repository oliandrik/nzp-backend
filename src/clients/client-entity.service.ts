import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ReferralSystem } from './entities/referral-system.entity';

@Injectable()
export class ClientEntityService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(ReferralSystem)
    private readonly referralSystemRepository: Repository<ReferralSystem>,
  ) {}

  getClientRepository() {
    return this.clientRepository;
  }

  getReferralSystemRepository() {
    return this.referralSystemRepository;
  }

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
