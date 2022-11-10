import { Provider } from 'src/providers/entities/provider.entity';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import {
  EServiceCancel,
  EServiceDripFeed,
  EServiceLinkDuplicate,
  EServiceMode,
  EServiceStatus,
  EServiceType,
} from '../interfaces/service.interfaces';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column()
  service_name: string;

  @ManyToOne(() => ServiceCategory)
  category: ServiceCategory;

  @Column({ type: 'enum', enum: EServiceStatus })
  status: EServiceStatus;

  @Column({ type: 'enum', enum: EServiceType })
  type: EServiceType;

  @Column({ type: 'enum', enum: EServiceMode })
  mode: EServiceMode;

  @ManyToOne(() => Provider)
  provider: Provider;

  // @Column()
  // provider_service: null;

  @Column({ type: 'enum', enum: EServiceDripFeed })
  drip_feed: EServiceDripFeed;

  @Column({ type: 'enum', enum: EServiceCancel })
  cancel: EServiceCancel;

  @Column()
  rate_per: number;

  @Column()
  min_order: number;

  @Column()
  max_order: number;

  @Column({ type: 'enum', enum: EServiceLinkDuplicate })
  link_duplicate: EServiceLinkDuplicate;

  @Column()
  increment: number;

  @Column()
  overflow: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
