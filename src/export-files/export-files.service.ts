import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportFile } from './entities/file.entity';

@Injectable()
export class ExportFilesService {
  constructor(
    @InjectRepository(ExportFile)
    private readonly exportFileRepository: Repository<ExportFile>,
  ) {}

  getRepository() {
    return this.exportFileRepository;
  }

  async getAllFiles() {
    return await this.exportFileRepository.find();
  }

  async getByClients() {
    return await this.exportFileRepository.query(
      `SELECT * FROM export_files WHERE export_for = "clients"`,
    );
  }

  async getByOrders() {
    return await this.exportFileRepository.query(
      `SELECT * FROM export_files WHERE export_for = "orders"`,
    );
  }

  async deleteFile(id) {
    return await this.exportFileRepository.delete(id);
  }
}
