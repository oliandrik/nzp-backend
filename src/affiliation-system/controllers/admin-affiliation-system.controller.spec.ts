import { Test, TestingModule } from '@nestjs/testing';
import { AdminAffiliationSystemController } from './admin-affiliation-system.controller';

import { AdminAffiliateSystemService } from '../services/admin-affiliation-system.service';

describe('AdminAffiliationSystemController', () => {
  let controller: AdminAffiliationSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAffiliationSystemController],
      providers: [AdminAffiliateSystemService],
    }).compile();

    controller = module.get<AdminAffiliationSystemController>(
      AdminAffiliationSystemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
