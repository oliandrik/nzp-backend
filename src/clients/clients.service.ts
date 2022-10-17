import { ExportFilesService } from 'src/export-files/export-files.service';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { EClientGender } from './interfaces/client.interfaces';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    private readonly exportFileService: ExportFilesService,
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
    return await this.clientRepository.find();
  }

  // this. userRepository.update(
  //   user.id ,
  //   user
  // );
  async changeGender(data, id) {
    // update without createQueryBuilder
    return await this.clientRepository
      .createQueryBuilder()
      .update()
      // .set({
      //   gender: EClientGender[data.gender],
      // })
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

    const res = await this.clientRepository.find({
      where: { status: body.status },
    });

    const writeStream = fs.createWriteStream(
      `${dir}/file_clients_${+new Date()}.${body.format}`,
    );

    const newFile = await this.exportFileService.getRepository().create({
      filename: `file_clients_${+new Date()}.${body.format}`,
      export_for: 'clients',
      createdAt: new Date(),
    });

    writeStream.write(`${JSON.stringify(res)}`); // json
    // if(type === 'json') {
    //   writeStream.write(`${JSON.stringify(res)}`); // json
    // }else if {} else
    writeStream.end();

    return await this.exportFileService.getRepository().save(newFile);
  }

  // SORT

  async sortByASC(param) {
    return await this.clientRepository.find({ order: { [param]: 'ASC' } });
  }

  async sortByDESC(param) {
    return await this.clientRepository.find({ order: { [param]: 'DESC' } });
  }

  async getByStatus(param) {
    return await this.clientRepository.find({ where: { status: param } });
  }
}
