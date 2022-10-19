import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import { Like, Repository } from 'typeorm';

import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll() {
    return await this.orderRepository.find({
      loadRelationIds: true,
    });
  }

  async byId(id) {
    const order = await this.orderRepository.find({
      loadRelationIds: true,
      where: { id: id },
    });

    if (!order) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return order;
  }

  async byLink(link) {
    return await this.orderRepository.find({
      where: {
        link: Like(`%${link}%`),
      },
      loadRelationIds: true,
    });
  }

  async byUsername(username) {
    return await this.orderRepository.find({
      where: {
        client: Like(`%${username}%`),
      },
      loadRelationIds: true,
    });
  }

  async byServiceId(serviceId) {
    return await this.orderRepository.find({
      where: {
        service: Like(`%${serviceId}%`),
      },
      loadRelationIds: true,
    });
  }

  async create(body) {
    return await this.orderRepository.insert({
      client: { id: body.clientId } as Client,
      service: { id: body.serviceId } as Service,
      // ...body,
      charge: faker.datatype.float(),
      link: faker.internet.url(),
      start_count: faker.datatype.number(),
      quantity: faker.datatype.number(),
      status: Math.floor(Math.random() * (6 - 1 + 1) + 1),
      remains: faker.datatype.number(),
      mode: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async update(id, body) {
    return await this.orderRepository.update(
      { id },
      { ...body, updated_at: new Date() },
    );
  }

  async deleteOne(id: number) {
    await this.byId(id);

    return (
      await this.orderRepository.delete(id),
      { message: 'Order was successfully deleted' }
    );
  }

  async bulkDelete(ids: []) {
    return (
      await this.orderRepository.delete(ids),
      { message: 'Orders were successfully deleted' }
    );
  }
}
