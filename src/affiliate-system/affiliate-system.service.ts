import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliateSystemDto } from './dto/affiliate-system.dto';
import { AffiliateSystem } from './entities/affiliate-system.entity';

@Injectable()
export class AffiliateSystemService {
  constructor(
    @InjectRepository(AffiliateSystem)
    private readonly affiliateSystemRepository: Repository<AffiliateSystem>,
  ) {}

  async findAll(): Promise<AffiliateSystem[]> {
    return await this.affiliateSystemRepository.find();
  }

  async byId(id): Promise<AffiliateSystem> {
    const affiliateSystem = await this.affiliateSystemRepository.findOne({
      where: { id: id },
    });

    if (!affiliateSystem) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return affiliateSystem;
  }

  async create(body: AffiliateSystemDto) {
    return (
      await this.affiliateSystemRepository.insert({
        ...body,
        created_at: new Date(),
        updated_at: new Date(),
      }),
      { message: 'Affiliate system was successfully created' }
    );
  }

  async update(id: number, body: AffiliateSystemDto) {
    await this.byId(id);

    return (
      await this.affiliateSystemRepository.update(
        { id },
        { ...body, updated_at: new Date() },
      ),
      { message: 'Affiliate system  was successfully updated' }
    );
  }

  async deleteOne(id: number) {
    await this.byId(id);

    return (
      await this.affiliateSystemRepository.delete(id),
      { message: 'Affiliate system was successfully deleted' }
    );
  }

  async bulkDelete(ids: []) {
    return (
      await this.affiliateSystemRepository.delete(ids),
      { message: 'Affiliate systems were successfully deleted' }
    );
  }
}
