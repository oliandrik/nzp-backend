import { Controller, Get } from '@nestjs/common';
import { UpdatesService } from './updates.service';

@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Get()
  async findAll() {
    return await this.updatesService.findAll();
  }
}
