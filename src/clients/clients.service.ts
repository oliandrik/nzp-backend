import { ExportFile } from 'src/export-files/entities/file.entity';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto } from './dto/client.dto';
import { Client, ClientGender } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(ExportFile)
    private readonly exportFileRepository: Repository<ExportFile>,
  ) {}

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

  async getClients() {
    return await this.clientRepository.query(`SELECT * FROM clients`);
  }

  async changeGender(data: ClientDto, id) {
    return await this.clientRepository
      .createQueryBuilder()
      .update()
      .set({
        gender: ClientGender[data.gender],
      })
      .where('id = :id', { id: id })
      .execute();
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

    const upd = await this.clientRepository
      .createQueryBuilder()
      .update()
      .set({
        avatar: avatar.avatar,
      })
      .where('id = :id', { id: id.id })
      .execute();

    return upd;
  }

  async exportClientsFile(body) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');

    const dir = './src/fileToExport';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const res = await this.clientRepository.query(
      `SELECT * FROM clients WHERE status = "${body.status}"`,
    );
    const writeStream = fs.createWriteStream(
      `${dir}/file_clients_${+new Date()}.${body.format}`,
    );

    const newFile = await this.exportFileRepository.create({
      filename: `file_clients_${+new Date()}.${body.format}`,
      export_for: 'clients',
      createdAt: new Date(),
    });

    writeStream.write(`${JSON.stringify(res)}`);
    writeStream.end();

    return await this.exportFileRepository.save(newFile);
  }

  // SORT

  async sortByASC(param) {
    return await this.clientRepository.query(
      `SELECT * FROM clients ORDER BY ${param} ASC`,
    );
  }

  async sortByDESC(param) {
    return await this.clientRepository.query(
      `SELECT * FROM clients ORDER BY ${param} DESC`,
    );
  }

  async sortByStatus(param) {
    return await this.clientRepository.query(
      `SELECT * FROM clients WHERE status = '${param}'`,
    );
  }
}
