import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateSystemController } from './affiliate-system.controller';
import { AffiliateSystemService } from './affiliate-system.service';
import { AffiliateSystem } from './entities/affiliate-system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliateSystem])],
  controllers: [AffiliateSystemController],
  providers: [AffiliateSystemService],
  exports: [AffiliateSystemService],
})
export class AffiliateSystemModule {}
