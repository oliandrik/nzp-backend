import { Repository } from 'typeorm';

import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EOrderStatus } from './interfaces/order.interfaces';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(body) {
    return await this.orderRepository.insert({
      client: faker.internet.userName(),
      charge: faker.datatype.float(),
      link: faker.internet.url(),
      start_count: faker.datatype.number(),
      quantity: faker.datatype.number(),
      service: faker.random.words(),
      status: Math.floor(Math.random() * (6 - 1 + 1) + 1),
      remains: faker.datatype.number(),
      created_at: new Date(),
    });
  }
}
