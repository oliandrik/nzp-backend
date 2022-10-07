import { ServiceCategory } from 'src/service-categories/entity/service-categories.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ModeService {
  auto = 'auto',
  manual = 'manual',
}

export enum CancelService {
  allow = 'allow',
  dissallow = 'dissallow',
}

export enum LinkDuplicateService {
  accept = 'accept',
  deny = 'deny',
}

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  service_name: string;

  @Column()
  category: ServiceCategory | null;

  @Column({ type: 'enum', enum: ModeService })
  mode: ModeService;

  @Column()
  provider: null;

  @Column({ type: 'enum', enum: CancelService })
  cancel: CancelService;

  @Column()
  rate_per: number;

  @Column()
  min_order: number;

  @Column()
  max_order: number;

  @Column({ type: 'enum', enum: LinkDuplicateService })
  link_duplicate: LinkDuplicateService;

  @Column()
  increment: number;

  @Column()
  overflow: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
