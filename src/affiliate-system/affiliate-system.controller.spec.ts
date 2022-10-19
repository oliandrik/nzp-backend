import { Test, TestingModule } from '@nestjs/testing';
import { AffiliateSystemController } from './affiliate-system.controller';
import { AffiliateSystemService } from './affiliate-system.service';

describe('AffiliateSystemController', () => {
  let controller: AffiliateSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffiliateSystemController],
      providers: [AffiliateSystemService],
    }).compile();

    controller = module.get<AffiliateSystemController>(
      AffiliateSystemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
