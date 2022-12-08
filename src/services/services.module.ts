import { ProvidersModule } from 'src/providers/providers.module';
import { UpdatesModule } from 'src/updates/updates.module';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalService } from './entities/internal-service.entity';
import { Service } from './entities/service.entity';

import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, InternalService]),
    HttpModule,
    UpdatesModule,
    ProvidersModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
