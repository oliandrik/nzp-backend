import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentMethodDto } from './dto/payment-methods.dto';
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  async createPaymentMethod(@Body() body: PaymentMethodDto) {
    return await this.paymentMethodsService.createPaymentMethod(body);
  }

  @Get()
  async getAllPaymentMethods() {
    return await this.paymentMethodsService.getAllPaymentMethods();
  }

  @Get(':id')
  async getPaymentMethod(@Param() id) {
    return await this.paymentMethodsService.byId(id.id);
  }
}
