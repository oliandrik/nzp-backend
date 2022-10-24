import { Provider } from 'src/providers/entities/provider.entity';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';

import {
  ECancelService,
  EDripFeedService,
  ELinkDuplicateService,
  EModeService,
  EStatusService,
  ETypeService,
} from '../interfaces/service.interfaces';

export class ServiceDto {
  id: bigint;
  service_name: string;
  category: ServiceCategory;
  mode: EModeService;
  type: ETypeService;
  provider: Provider;
  // provider_service: null;
  drip_feed: EDripFeedService;
  cancel: ECancelService;
  rate_per: number;
  min_order: number;
  max_order: number;
  link_duplicate: ELinkDuplicateService;
  increment: number;
  overflow: number;
  status: EStatusService;
}
