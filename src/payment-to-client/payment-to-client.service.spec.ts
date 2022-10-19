import { Test, TestingModule } from '@nestjs/testing';
import { PaymentToClientService } from './payment-to-client.service';

describe('PaymentToClientService', () => {
  let service: PaymentToClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentToClientService],
    }).compile();

    service = module.get<PaymentToClientService>(PaymentToClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
