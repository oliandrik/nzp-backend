import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAffiliationSystemController } from './controllers/admin-affiliation-system.controller';
import { ClientAffiliationSystemController } from './controllers/client-affiliation-system.controller';
import { AdminAffiliationSystem } from './entities/admin-affiliate-system.entity';
import { ClientAffiliationSystem } from './entities/client-affiliate-system.entity';

import { AdminAffiliateSystemService } from './services/admin-affiliation-system.service';
import { ClientAffiliateSystemService } from './services/client-affiliation-system.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminAffiliationSystem, ClientAffiliationSystem]),
  ],
  controllers: [
    AdminAffiliationSystemController,
    ClientAffiliationSystemController,
  ],
  providers: [AdminAffiliateSystemService, ClientAffiliateSystemService],
  exports: [AdminAffiliateSystemService, ClientAffiliateSystemService],
})
export class AffiliationSystemModule {}
