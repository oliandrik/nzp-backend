import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AverageTimeController } from './average-time.controller';
import { AverageTimeService } from './average-time.service';
import { AverageTime } from './entities/average-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AverageTime])],
  controllers: [AverageTimeController],
  providers: [AverageTimeService],
  exports: [AverageTimeService],
})
export class AverageTimeModule {}
