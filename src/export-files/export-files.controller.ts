import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ExportFilesService } from './export-files.service';

@Controller('export-files')
export class ExportFilesController {
  constructor(private readonly exportFilesService: ExportFilesService) {}

  @Get()
  async getAllFiles() {
    return await this.exportFilesService.getAllFiles();
  }

  @Get('get-by/:param')
  async getByParam(@Param('param') param: string) {
    console.log(param, 'param');
    return await this.exportFilesService.getBy(param);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.exportFilesService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id) {
    return await this.exportFilesService.deleteFile(id);
  }
}
