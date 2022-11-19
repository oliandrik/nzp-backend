import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EIsAllowedPaymentMenthod } from './interfaces/payment-method.interfaces';
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  async getAllPaymentMethods() {
    return await this.paymentMethodsService.getAll();
  }

  @Get(':id')
  async getPaymentMethod(@Param() id) {
    return await this.paymentMethodsService.byId(id.id);
  }

  @Post()
  async createPaymentMethod(@Body() body) {
    return await this.paymentMethodsService.create(body);
  }

  @Put(':id/set-visibility')
  async visibility(@Param('id') id, @Body() body) {
    return await this.paymentMethodsService.visibility(id, body.visibility);
  }

  @Put(':id/set-accessibility')
  async accessibility(@Param('id') id, @Body() body) {
    if (!EIsAllowedPaymentMenthod[body.is_allowed.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return await this.paymentMethodsService.accessibility(id, body.is_allowed);
  }

  @Delete(':id')
  async deletePaymentMethod(@Param('id') id) {
    return await this.paymentMethodsService.deleteOne(id);
  }
}
