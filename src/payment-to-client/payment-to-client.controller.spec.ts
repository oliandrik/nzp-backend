import { Test, TestingModule } from '@nestjs/testing';
import { PaymentToClientController } from './payment-to-client.controller';
import { PaymentToClientService } from './payment-to-client.service';

describe('PaymentToClientController', () => {
  let controller: PaymentToClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentToClientController],
      providers: [PaymentToClientService],
    }).compile();

    controller = module.get<PaymentToClientController>(PaymentToClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
