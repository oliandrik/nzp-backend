import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiCurrency } from './entities/multi-currency.entity';
import { MultiCurrencyController } from './multi-currency.controller';
import { MultiCurrencyService } from './multi-currency.service';

@Module({
  imports: [TypeOrmModule.forFeature([MultiCurrency])],
  controllers: [MultiCurrencyController],
  providers: [MultiCurrencyService],
  exports: [MultiCurrencyService],
})
export class MultiCurrencyModule {}
