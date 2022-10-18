import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralSetting } from './entities/general-settings.entity';
import { GeneralSettingsController } from './general-settings.controller';
import { GeneralSettingsService } from './general-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralSetting])],
  controllers: [GeneralSettingsController],
  providers: [GeneralSettingsService],
  exports: [GeneralSettingsService],
})
export class GeneralSettingsModule {}
