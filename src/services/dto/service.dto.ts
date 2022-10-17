import {
  CancelService,
  DripFeedService,
  LinkDuplicateService,
  ModeService,
  StatusService,
  TypeService,
} from '../entities/service.entity';

export class ServiceDto {
  id: bigint;
  service_name: string;
  category: string;
  mode: ModeService;
  type: TypeService;
  provider: null;
  service: null;
  drip_feed: DripFeedService;
  cancel: CancelService;
  rate_per: number;
  min_order: number;
  max_order: number;
  link_duplicate: LinkDuplicateService;
  increment: number;
  overflow: number;
  status: StatusService;
}
