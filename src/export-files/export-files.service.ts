import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getBy(param) {
    return await this.exportFileRepository.find({
      where: { export_for: param },
    });
  }

  async byId(id) {
    const file = await this.exportFileRepository.findOne({
      where: { id: id },
    });

    if (!file) {
      throw new BadRequestException('The file does not exist');
    }

    return file;
  }

  async bulkDelete(ids: []) {
    return (
      await this.exportFileRepository.delete(ids),
      { message: 'Files were successfully deleted' }
    );
  }

  async deleteFile(id) {
    return (
      await this.exportFileRepository.delete(id),
      { message: 'File was successfully deleted' }
    );
  }
}
