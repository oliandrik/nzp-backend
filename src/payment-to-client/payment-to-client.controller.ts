import { Controller } from '@nestjs/common';
import { PaymentToClientService } from './payment-to-client.service';

@Controller('payment-to-client')
export class PaymentToClientController {
  constructor(private readonly paymentToClientService: PaymentToClientService) {}
}
