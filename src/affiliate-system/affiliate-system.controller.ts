import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AffiliateSystemService } from './affiliate-system.service';
import { AffiliateSystemDto } from './dto/affiliate-system.dto';
import { AffiliateSystem } from './entities/affiliate-system.entity';

@Controller('affiliate-system')
export class AffiliateSystemController {
  constructor(
    private readonly affiliateSystemService: AffiliateSystemService,
  ) {}

  @Get()
  async getAllAffiliateSystems(): Promise<AffiliateSystem[]> {
    return await this.affiliateSystemService.findAll();
  }

  @Get(':id')
  async getAffiliateSystemById(@Param('id') id): Promise<AffiliateSystem> {
    return await this.affiliateSystemService.byId(id);
  }

  @Post()
  async createAffiliateSystem(@Body() body: AffiliateSystemDto) {
    return await this.affiliateSystemService.create(body);
  }

  @Put(':id')
  async updateAffiliateSystem(
    @Param('id') id,
    @Body() body: AffiliateSystemDto,
  ) {
    return await this.affiliateSystemService.update(id, body);
  }

  @Delete('bulk-delete')
  async bulkDelete(@Body() body) {
    return await this.affiliateSystemService.bulkDelete(body.ids);
  }

  @Delete(':id')
  async deleteAffiliateSystem(@Param('id') id) {
    return await this.affiliateSystemService.deleteOne(id);
  }
}
