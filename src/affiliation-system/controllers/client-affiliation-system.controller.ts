import { Body, Controller, Param, Put } from '@nestjs/common';

import { ClientAffiliateSystemService } from '../services/client-affiliation-system.service';

@Controller('affiliation-system')
export class ClientAffiliationSystemController {
  constructor(
    private readonly affiliationSystemService: ClientAffiliateSystemService,
  ) {}

  @Put(':id/set-referral-code')
  async setReferralCode(@Param('id') id, @Body() body) {
    return await this.affiliationSystemService.setCode(id, body.code);
  }
}
