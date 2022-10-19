import { Test, TestingModule } from '@nestjs/testing';
import { MultiCurrencyController } from './multi-currency.controller';
import { MultiCurrencyService } from './multi-currency.service';

describe('MultiCurrencyController', () => {
  let controller: MultiCurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultiCurrencyController],
      providers: [MultiCurrencyService],
    }).compile();

    controller = module.get<MultiCurrencyController>(MultiCurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
