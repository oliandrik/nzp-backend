import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralSetting } from './entities/general-settings.entity';

@Injectable()
export class GeneralSettingsService {
  constructor(
    @InjectRepository(GeneralSetting)
    private readonly generalSettingRepository: Repository<GeneralSetting>,
  ) {}

  async saveChages(id, body) {
    return await this.generalSettingRepository.update(
      { id },
      { ...body, updated_at: new Date() },
    );
  }
}
