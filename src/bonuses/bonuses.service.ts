import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bonus } from './entities/bonus.entity';

@Injectable()
export class BonusesService {
  constructor(
    @InjectRepository(Bonus)
    private readonly bonusRepository: Repository<Bonus>,
  ) {}

  async getBonuses() {
    return await this.bonusRepository.find();
  }

  async byId(id) {
    const bonus = await this.bonusRepository.findOne({
      where: { id: id.id },
    });

    if (!bonus) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return bonus;
  }

  async addBonus(body) {
    return await this.bonusRepository.insert({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async updateBonus(id, body) {
    await this.byId(id);

    return await this.bonusRepository.update(
      { id },
      { ...body, updated_at: new Date() },
    );
  }

  async deleteBonus(id) {
    await this.byId(id);

    return (
      await this.bonusRepository.delete(id),
      { message: 'Bonus was successfully deleted' }
    );
  }
}
