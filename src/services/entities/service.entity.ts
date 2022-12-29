import { Provider } from 'src/providers/entities/provider.entity';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { InternalService } from './internal-service.entity';
import {
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

  @Column({ type: 'text', default: null })
  description: string;

  @ManyToOne(() => ServiceCategory)
  @JoinColumn()
  category: ServiceCategory;

  @Column({ type: 'enum', enum: EServiceStatus })
  status: EServiceStatus;

  @Column({ type: 'enum', enum: EServiceType })
  type: EServiceType;

  @Column({ type: 'enum', enum: EServiceMode })
  mode: EServiceMode;

  @ManyToOne(() => Provider)
  @JoinColumn()
  provider: Provider;

  @OneToOne(() => InternalService)
  @JoinColumn()
  internal_project: InternalService;

  @Column({ default: true })
  dripfeed: boolean;

  @Column({ default: true })
  refill: boolean;

  @Column()
  cancel: boolean;

  @Column()
  rate_per: number;

  @Column()
  min_order: number;

  @Column()
  max_order: number;

  @Column({ default: true })
  link_duplicate: boolean;

  @Column()
  increment: number;

  @Column()
  overflow: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
