import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientAffiliationSystem } from '../entities/client-affiliate-system.entity';

@Injectable()
export class ClientAffiliateSystemService {
  constructor(
    @InjectRepository(ClientAffiliationSystem)
    private readonly affiliateSystemRepository: Repository<ClientAffiliationSystem>,
  ) {}
}
