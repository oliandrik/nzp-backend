import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async getOrderById(@Param('id') id) {
    return await this.ordersService.byId(id);
  }

  @Get('search-by-link/:link')
  async searchByLink(@Param('link') link) {
    return await this.ordersService.byLink(link);
  }

  //fix
  @Get('search-by-username/:username')
  async searchByUsername(@Param('username') username) {
    return await this.ordersService.byUsername(username);
  }

  @Get('search-by-serviceId/:serviceId')
  async searchByServiceId(@Param('serviceId') serviceId) {
    return await this.ordersService.byServiceId(serviceId);
  }

  //externalId
  //provider
  //ip address

  @Post()
  async createOrder(@Body() body: OrderDto) {
    return await this.ordersService.create(body);
  }

  @Put(':id')
  async updateOrder(@Param('id') id, @Body() body: OrderDto) {
    return await this.ordersService.update(id, body);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.ordersService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id) {
    return await this.ordersService.deleteOne(id);
  }
}
