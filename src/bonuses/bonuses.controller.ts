import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BonusesService } from './bonuses.service';
import { BonusDto } from './dto/bonus.dto';

@Controller('bonuses')
export class BonusesController {
  constructor(private readonly bonusesService: BonusesService) {}

  @Get()
  async getBonuses() {
    return await this.bonusesService.getBonuses();
  }

  @Get(':id')
  async getBonuse(@Param('id') id) {
    return await this.bonusesService.byId(id.id);
  }

  @Post()
  async addBonus(@Body() body: BonusDto) {
    return await this.bonusesService.addBonus(body);
  }

  @Put(':id')
  async updateBonus(@Param('id') id, @Body() body: BonusDto) {
    return await this.bonusesService.updateBonus(id, body);
  }

  @Delete(':id')
  async deleteBonus(@Param('id') id) {
    return await this.deleteBonus(id);
  }
}
