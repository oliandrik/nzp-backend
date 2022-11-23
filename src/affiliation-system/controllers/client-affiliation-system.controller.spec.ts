import { Test, TestingModule } from '@nestjs/testing';
import { ClientAffiliationSystemController } from './client-affiliation-system.controller';
import { ClientAffiliationSystem } from '../entities/client-affiliate-system.entity';

describe('ClientAffiliationSystemController', () => {
  let controller: ClientAffiliationSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientAffiliationSystemController],
      providers: [ClientAffiliationSystem],
    }).compile();

    controller = module.get<ClientAffiliationSystemController>(
      ClientAffiliationSystemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
