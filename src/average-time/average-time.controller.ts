import { Body, Controller, Param, Put } from '@nestjs/common';
import { AverageTimeService } from './average-time.service';

@Controller('average-time')
export class AverageTimeController {
  constructor(private readonly averageTimeService: AverageTimeService) {}

  @Put()
  async updateDisplayOn(@Param('id') id, @Body() body) {
    return await this.averageTimeService.update(id, body);
  }
}
