import { Body, Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ExportFilesService } from './export-files.service';

@Controller('export-files')
export class ExportFilesController {
  constructor(private readonly exportFilesService: ExportFilesService) {}

  @Get()
  async getAllFiles() {
    return await this.exportFilesService.getAllFiles();
  }

  @Get(':id')
  async downloadFile(@Res() res, @Param('id') id) {
    const file = await this.exportFilesService.byId(id);

    return res.download('./src/fileToExport/' + file.filename);
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
