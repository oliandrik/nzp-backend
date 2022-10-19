import { Service } from 'src/services/entities/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {
  ECategoryPosition,
  ECategoryStatus,
} from '../interfaces/service-categories.interfaces';

@Entity({ name: 'service_categories' })
export class ServiceCategory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  category_name: string;

  @Column({
    type: 'enum',
    enum: ECategoryPosition,
  })
  position: ECategoryPosition;

  @Column({
    type: 'enum',
    enum: ECategoryStatus,
  })
  status: ECategoryStatus;

  @Column({ default: null })
  icon: null | string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
