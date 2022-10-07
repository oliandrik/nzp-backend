import { ServiceCategory } from 'src/service-categories/entity/service-categories.entity';

import {
  CancelService,
  LinkDuplicateService,
  ModeService,
} from '../entity/service.entity';

export class ServiceDto {
  id: bigint;
  service_name: string;
  category: ServiceCategory | null;
  mode: ModeService;
  provider: null;
  cancel: CancelService;
  rate_per: number;
  min_order: number;
  max_order: number;
  link_duplicate: LinkDuplicateService;
  increment: number;
  overflow: number;
}
