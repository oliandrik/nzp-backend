import { Controller } from '@nestjs/common';

import { ClientAffiliateSystemService } from '../services/client-affiliation-system.service';

@Controller('affiliation-system')
export class ClientAffiliationSystemController {
  constructor(
    private readonly affiliateSystemService: ClientAffiliateSystemService,
  ) {}
}
