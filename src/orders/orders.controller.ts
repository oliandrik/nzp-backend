import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll() {
    return await this.ordersService.getAll();
  }

  @Post()
  async createOrder(@Body() body: OrderDto) {
    return await this.ordersService.createOrder(body);
  }
}
