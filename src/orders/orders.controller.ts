import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(@Query() query) {
    return await this.ordersService.findAll(query);
  }

  @Get(':id')
  async getOrderById(@Param('id') id) {
    return await this.ordersService.byId(id);
  }

  @Post()
  async createOrder(@Body() body: OrderDto) {
    for (let i = 0; i < 98; i++) {
      await this.ordersService.create(body);
    }

    // return ;
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

  @Post('files')
  async exportOrdersFile(@Body() body) {
    return await this.ordersService.exportOrdersFile(body);
  }
}
