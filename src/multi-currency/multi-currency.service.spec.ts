import { Test, TestingModule } from '@nestjs/testing';
import { MultiCurrencyService } from './multi-currency.service';

describe('MultiCurrencyService', () => {
  let service: MultiCurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiCurrencyService],
    }).compile();

    service = module.get<MultiCurrencyService>(MultiCurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
