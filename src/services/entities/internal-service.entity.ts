import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { EServiceType } from '../interfaces/service.interfaces';

@Entity({ name: 'internal_services' })
export class InternalService {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column()
  cancel: boolean;

  @Column()
  category: string;

  @Column()
  dripfeed: boolean;

  @Column()
  max: number;

  @Column()
  min: number;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  rate: number;

  @Column()
  refill: boolean;

  @Column()
  service: string;

  @Column({ type: 'enum', enum: EServiceType })
  type: EServiceType;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
