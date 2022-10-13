import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentMethodDto } from './dto/payment-methods.dto';
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPaymentMethods() {
    return await this.paymentMethodsService.getAllPaymentMethods();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPaymentMethod(@Param() id) {
    return await this.paymentMethodsService.byId(id.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaymentMethod(@Body() body: PaymentMethodDto) {
    return await this.paymentMethodsService.createPaymentMethod(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async changeAccessibilityToNewUsers(@Param('id') id, @Body() body) {
    return await this.paymentMethodsService.changeAccessibilityToNewUsers(
      id,
      body.new_users,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePaymentMethod(@Param('id') id) {
    return await this.paymentMethodsService.deletePaymentMethod(id);
  }
}
