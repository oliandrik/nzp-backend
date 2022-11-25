import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientAffiliationSystem } from '../entities/client-affiliate-system.entity';

@Injectable()
export class ClientAffiliateSystemService {
  constructor(
    @InjectRepository(ClientAffiliationSystem)
    private readonly affiliationSystemRepository: Repository<ClientAffiliationSystem>,
  ) {}

  async byCode(param) {
    const code = await this.affiliationSystemRepository.findOne({
      where: {
        code: param,
      },
    });

    if (code) {
      throw new BadRequestException('Enter other code');
    }

    return code;
  }

  async setCode(id, code) {
    await this.byCode(code);

    return await this.affiliationSystemRepository.update(
      { id: id },
      { code, updated_at: new Date() },
    );
  }
}
