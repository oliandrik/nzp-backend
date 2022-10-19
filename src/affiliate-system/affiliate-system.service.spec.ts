import { Test, TestingModule } from '@nestjs/testing';
import { AffiliateSystemService } from './affiliate-system.service';

describe('AffiliateSystemService', () => {
  let service: AffiliateSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffiliateSystemService],
    }).compile();

    service = module.get<AffiliateSystemService>(AffiliateSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
