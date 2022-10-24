import { Provider } from 'src/providers/entities/provider.entity';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import {
  ECancelService,
  EDripFeedService,
  ELinkDuplicateService,
  EModeService,
  EStatusService,
  ETypeService,
} from '../interfaces/service.interfaces';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column()
  service_name: string;

  @ManyToOne(() => ServiceCategory)
  category: ServiceCategory;

  @Column({ type: 'enum', enum: EStatusService })
  status: EStatusService;

  @Column({ type: 'enum', enum: ETypeService })
  type: ETypeService;

  @Column({ type: 'enum', enum: EModeService })
  mode: EModeService;

  @ManyToOne(() => Provider)
  provider: Provider;

  // @Column()
  // provider_service: null;

  @Column({ type: 'enum', enum: EDripFeedService })
  drip_feed: EDripFeedService;

  @Column({ type: 'enum', enum: ECancelService })
  cancel: ECancelService;

  @Column()
  rate_per: number;

  @Column()
  min_order: number;

  @Column()
  max_order: number;

  @Column({ type: 'enum', enum: ELinkDuplicateService })
  link_duplicate: ELinkDuplicateService;

  @Column()
  increment: number;

  @Column()
  overflow: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
