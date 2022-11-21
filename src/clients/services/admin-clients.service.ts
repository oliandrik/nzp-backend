import * as bcrypt from 'bcrypt';
import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { ExportFilesService } from 'src/export-files/export-files.service';
import { Between, In, Like } from 'typeorm';
import { json2xml } from 'xml-js';

import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ClientDto } from '../dto/client.dto';
import { InjectService } from '../inject.service';
import {
  EClientGender,
  EClientRank,
  EClientStatus,
} from '../interfaces/client.interfaces';

@Injectable()
export class AdminClientsService {
  constructor(
    private readonly injectClientService: InjectService,
    private readonly exportFileService: ExportFilesService,
  ) {}

  async getClients(query) {
    const clientsPerPage = query.take || 20;
    const page = query.page || 1;
    const skip = (page - 1) * clientsPerPage;
    const keyword = query.keyword || '';

    const status: string = query.status || '';

    const sortByField = query.sortBy || 'created_at';
    const sortDirection = query.sortDir || 'ASC';

    const [result, total] =
      await this.injectClientService.clientRepository.findAndCount({
        where: {
          username: Like('%' + keyword + '%'),
          status: EClientStatus[status.toUpperCase()],
        },
        take: clientsPerPage,
        skip: skip,
        order: {
          [sortByField]: sortDirection,
        },
      });

    return {
      data: result,
      total: total,
    };
  }

  async exportClientsFile(body) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const csvjson = require('csvjson');

    const dir = './src/fileToExport';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const res = await this.injectClientService.clientRepository.find({
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

  async setPassword(id, password) {
    await this.injectClientService.byId(id);

    const hashedPassword = await bcrypt.hash(password, 10);

    return (
      await this.injectClientService.clientRepository.update(
        { id },
        { password: hashedPassword, updated_at: new Date() },
      ),
      { message: 'Password  was successfully updated' }
    );
  }

  async discount(id, discount) {
    await this.injectClientService.byId(id);

    return (
      await this.injectClientService.clientRepository.update(
        { id },
        { discount, updated_at: new Date() },
      ),
      { message: 'Discount  was successfully updated' }
    );
  }

  async changeStatus(id, status: string) {
    await this.injectClientService.byId(id);

    if (!EClientStatus[status.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return (
      await this.injectClientService.clientRepository.update(
        { id },
        { status: EClientStatus[status.toUpperCase()], updated_at: new Date() },
      ),
      { message: 'Status  was successfully updated' }
    );
  }

  async saveClient(@Body() data: ClientDto) {
    const client = await this.injectClientService.clientRepository.create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      lastAuth: new Date(),
    });
    return await this.injectClientService.clientRepository.save(client);
  }

  async addClient(data) {
    await this.validateByEmailAndUsername(data);

    const { email, password, username } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return (
      await this.injectClientService.clientRepository.insert({
        username,
        email,
        password: hashedPassword,
        terms: true,
        balance: 0.0,
        spent: 0.0,
        discount: 0.0,
        rank: EClientRank.NEW,
        status: EClientStatus.ACTIVE,
        avatar: null,
        gender: EClientGender.OTHER,
        role: ERoles.CLIENT,
        created_at: new Date(),
        updated_at: new Date(),
        lastAuth: new Date(),
      }),
      { message: 'User was successfully created' }
    );
  }

  async updateClient(id, data) {
    const client = await this.injectClientService.clientRepository.findOne({
      where: { id: id.id },
    });

    if (!client) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.validateByEmailAndUsername(data);

    return (
      await this.injectClientService.clientRepository.update(
        { id },
        { username: data.username, email: data.email, updated_at: new Date() },
      ),
      { message: 'User  was successfully updated' }
    );
  }

  async validateByEmailAndUsername(data) {
    const oldClientByEmail =
      await this.injectClientService.clientRepository.findOneBy({
        email: data.email,
      });

    const oldClientByUsername =
      await this.injectClientService.clientRepository.findOneBy({
        username: data.username,
      });

    if (oldClientByEmail && oldClientByUsername) {
      throw new BadRequestException(
        'Please enter a different email address and username',
      );
    }

    if (oldClientByEmail) {
      throw new BadRequestException(
        'User with this email is already in system',
      );
    }

    if (oldClientByUsername) {
      throw new BadRequestException(
        'User with this username is already in system',
      );
    }

    return { oldClientByEmail, oldClientByUsername };
  }
}
