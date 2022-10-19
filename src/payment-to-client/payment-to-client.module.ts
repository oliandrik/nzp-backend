import { Module } from '@nestjs/common';
import { PaymentToClientService } from './payment-to-client.service';
import { PaymentToClientController } from './payment-to-client.controller';

@Module({
  controllers: [PaymentToClientController],
  providers: [PaymentToClientService]
})
export class PaymentToClientModule {}
