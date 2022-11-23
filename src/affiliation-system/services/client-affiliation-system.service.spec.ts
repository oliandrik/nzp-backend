import { Test, TestingModule } from '@nestjs/testing';
import { ClientAffiliateSystemService } from './client-affiliation-system.service';

describe('ClientAffiliateSystemService', () => {
  let service: ClientAffiliateSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAffiliateSystemService],
    }).compile();

    service = module.get<ClientAffiliateSystemService>(
      ClientAffiliateSystemService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
