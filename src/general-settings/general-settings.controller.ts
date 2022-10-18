import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { GeneralSettingDto } from './dto/general-setting.dto';
import { GeneralSettingsService } from './general-settings.service';

@Controller('general-settings')
export class GeneralSettingsController {
  constructor(
    private readonly generalSettingsService: GeneralSettingsService,
  ) {}

  @Post()
  async createSettings(@Body() body: GeneralSettingDto) {
    return await this.generalSettingsService.createSettings(body);
  }

  @Put(':id')
  async saveChages(@Param('id') id: number, @Body() body: GeneralSettingDto) {
    return await this.generalSettingsService.saveChages(id, body);
  }
}
