import { Provider } from 'src/providers/entities/provider.entity';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';

import { InternalService } from '../entities/internal-service.entity';
import {
  EServiceMode,
  EServiceStatus,
  EServiceType,
} from '../interfaces/service.interfaces';

export class ServiceDto {
  id: bigint;
  service_name: string;
  category: ServiceCategory;
  mode: EServiceMode;
  type: EServiceType;
  provider: Provider;
  internal_project: InternalService;
  dripfeed: boolean;
  cancel: boolean;
  rate_per: number;
  min_order: number;
  max_order: number;
  link_duplicate: boolean;
  increment: number;
  overflow: number;
  status: EServiceStatus;
}
