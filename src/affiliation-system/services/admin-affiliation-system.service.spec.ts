import { Test, TestingModule } from '@nestjs/testing';
import { AdminAffiliateSystemService } from './admin-affiliation-system.service';

describe('AdminAffiliateSystemService', () => {
  let service: AdminAffiliateSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAffiliateSystemService],
    }).compile();

    service = module.get<AdminAffiliateSystemService>(
      AdminAffiliateSystemService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
