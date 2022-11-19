import * as bcrypt from 'bcrypt';
import { ExportFilesService } from 'src/export-files/export-files.service';
import { Between, In, Like, Repository } from 'typeorm';
import { json2xml } from 'xml-js';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { EClientRank, EClientStatus } from './interfaces/client.interfaces';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    private readonly exportFileService: ExportFilesService,
  ) {}

  // SORT

  async sortByASC(param) {
    return await this.clientRepository.find({ order: { [param]: 'ASC' } });
  }

  async sortByDESC(param) {
    return await this.clientRepository.find({ order: { [param]: 'DESC' } });
  }

  async getByStatus(param: string) {
    return await this.clientRepository.find({
      where: { status: EClientStatus[param.toUpperCase()] },
    });
  }

  //

  async byEmail(data) {
    const client = await this.clientRepository.findOne({
      where: { email: data },
    });

    if (!client) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return client;
  }

  async byId(id) {
    const client = await this.clientRepository.findOne({
      where: { id: id.id },
    });

    if (!client) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return client;
  }

  async getClients(query) {
    const take = query.take || 20;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const [result, total] = await this.clientRepository.findAndCount({
      where: { username: Like('%' + keyword + '%') },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      total: total,
    };
  }

  async changeGender(data, id) {
    await this.byId(id);

    return await this.clientRepository.update(
      { id },
      { gender: data.gender, updated_at: new Date() },
    );
  }

  async changeAvatar(avatar, id) {
    const findUser = await this.byId(id);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');

    if (findUser.avatar !== null) {
      fs.unlink(`./uploads/avatars/${findUser.avatar}`, function (err) {
        if (err) {
          throw err;
        } else {
          console.log('Successfully deleted the file.');
        }
      });
      delete findUser.avatar;
    }

    return (
      await this.clientRepository.update(
        { id },
        { avatar: avatar.avatar, updated_at: new Date() },
      ),
      { message: 'Avatar  was successfully updated' }
    );
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

    const res = await this.clientRepository.find({
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
    await this.byId(id);

    const hashedPassword = await bcrypt.hash(password, 10);

    return (
      await this.clientRepository.update(
        { id },
        { password: hashedPassword, updated_at: new Date() },
      ),
      { message: 'Password  was successfully updated' }
    );
  }

  async discount(id, discount) {
    await this.byId(id);

    return (
      await this.clientRepository.update(
        { id },
        { discount, updated_at: new Date() },
      ),
      { message: 'Discount  was successfully updated' }
    );
  }

  async changeStatus(id, status: string) {
    await this.byId(id);

    if (!EClientStatus[status.toUpperCase()]) {
      throw new BadRequestException('Invalid status');
    }

    return (
      await this.clientRepository.update(
        { id },
        { status: EClientStatus[status.toUpperCase()], updated_at: new Date() },
      ),
      { message: 'Status  was successfully updated' }
    );
  }
}
