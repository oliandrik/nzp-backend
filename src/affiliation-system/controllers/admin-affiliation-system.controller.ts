import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminAffiliationSystem } from '../entities/admin-affiliate-system.entity';

import { AdminAffiliateSystemService } from '../services/admin-affiliation-system.service';

@Controller('affiliate-system')
export class AdminAffiliationSystemController {
  constructor(
    private readonly affiliateSystemService: AdminAffiliateSystemService,
  ) {}

  @Get()
  async getAllAffiliateSystems(): Promise<AdminAffiliationSystem[]> {
    return await this.affiliateSystemService.findAll();
  }

  @Get(':id')
  async getAffiliateSystemById(
    @Param('id') id,
  ): Promise<AdminAffiliationSystem> {
    return await this.affiliateSystemService.byId(id);
  }

  @Post()
  async createAffiliateSystem(@Body() body) {
    return await this.affiliateSystemService.create(body);
  }

  @Put(':id')
  async updateAffiliateSystem(@Param('id') id, @Body() body) {
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
