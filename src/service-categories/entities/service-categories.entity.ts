import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    // default: ECategoryPosition.TOP,
  })
  position: ECategoryPosition;

  @Column({
    type: 'enum',
    enum: ECategoryStatus,
    // default: ECategoryStatus.ENABLED,
  })
  status: ECategoryStatus;

  @Column({ default: null })
  icon: null | string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  // (1 service categories can have many services)

  // @OneToMany(() => Service, (service) => service.category, { cascade: true })
  // services: Service[];
}
