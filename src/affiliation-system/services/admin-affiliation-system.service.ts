import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminAffiliationSystem } from '../entities/admin-affiliate-system.entity';

@Injectable()
export class AdminAffiliateSystemService {
  constructor(
    @InjectRepository(AdminAffiliationSystem)
    private readonly affiliateSystemRepository: Repository<AdminAffiliationSystem>,
  ) {}

  async findAll(): Promise<AdminAffiliationSystem[]> {
    return await this.affiliateSystemRepository.find();
  }

  async byId(id): Promise<AdminAffiliationSystem> {
    const affiliateSystem = await this.affiliateSystemRepository.findOne({
      where: { id: id },
    });

    if (!affiliateSystem) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return affiliateSystem;
  }

  async create(body) {
    return (
      await this.affiliateSystemRepository.insert({
        ...body,
        created_at: new Date(),
        updated_at: new Date(),
      }),
      { message: 'Affiliation system was successfully created' }
    );
  }

  async update(id: number, body) {
    await this.byId(id);

    return (
      await this.affiliateSystemRepository.update(
        { id },
        { ...body, updated_at: new Date() },
      ),
      { message: 'Affiliation system  was successfully updated' }
    );
  }

  async deleteOne(id: number) {
    await this.byId(id);

    return (
      await this.affiliateSystemRepository.delete(id),
      { message: 'Affiliation system was successfully deleted' }
    );
  }

  async bulkDelete(ids: []) {
    return (
      await this.affiliateSystemRepository.delete(ids),
      { message: 'Affiliation systems were successfully deleted' }
    );
  }
}
