import { Client } from 'src/clients/entities/client.entity';
import { ExportFilesService } from 'src/export-files/export-files.service';
import { Service } from 'src/services/entities/service.entity';
import { Between, In, Like, Repository } from 'typeorm';
import { json2xml } from 'xml-js';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly exportFileService: ExportFilesService,
  ) {}

  async findAll() {
    return await this.orderRepository.find({
      // loadRelationIds: true,
      relations: {
        client: true,
        service: true,
      },
      select: {
        client: {
          username: true,
        },
        // service: {
        //   id: true,

        // }
      },
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
      ...body,
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

  async exportOrdersFile(body) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const csvjson = require('csvjson');

    const dir = './src/fileToExport';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const res = await this.orderRepository.find({
      where: {
        status: In(body.status),
        created_at: Between(body.from, body.to),
      },
    });

    const writeStream = fs.createWriteStream(
      `${dir}/file_clients_${+new Date()}.${body.format}`,
    );

    const newFile = await this.exportFileService.getRepository().create({
      filename: `file_clients_${+new Date()}.${body.format}`,
      export_for: 'clients',
      created_at: new Date(),
    });

    switch (body.format) {
      case 'csv':
        writeStream.write(
          csvjson.toCSV(res, {
            headers: 'key',
          }),
        );
        break;
      case 'xml':
        writeStream.write(
          json2xml(JSON.stringify(res), { compact: true, spaces: 4 }),
        );
      default:
        writeStream.write(`${JSON.stringify(res)}`);
        break;
    }

    writeStream.end();

    return await this.exportFileService.getRepository().save(newFile);
  }
}
