import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: null })
  category: string;

  @Column({ type: 'enum', enum: EStatusService })
  status: EStatusService;

  @Column({ type: 'enum', enum: ETypeService })
  type: ETypeService;

  @Column({ type: 'enum', enum: EModeService })
  mode: EModeService;

  @Column({ default: null })
  provider: string;

  @Column({ default: null })
  service: string;

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

  // (1 service can have one service)

  // @ManyToOne(
  //   () => ServiceCategory,
  //   (serviceCategory) => serviceCategory.services,
  // )
  // category: ServiceCategory;
}
