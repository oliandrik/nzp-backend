import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ExportFilesService } from './export-files.service';

@Controller('export-files')
export class ExportFilesController {
  constructor(private readonly exportFilesService: ExportFilesService) {}

  @Get()
  async getAllFiles() {
    return await this.exportFilesService.getAllFiles();
  }

  @Delete(':id')
  async deleteFile(@Param('id') id) {
    return await this.exportFilesService.deleteFile(id);
  }
}
