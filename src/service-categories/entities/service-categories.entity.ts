import { Service } from 'src/services/entities/service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum CategoryPosition {
  top = 'top',
  bottom = 'bottom',
}

export enum CategoryStatus {
  enabled = 'enabled',
  disabled = 'disabled',
}

@Entity({ name: 'service_categories' })
export class ServiceCategory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  category_name: string;

  @Column({ type: 'enum', enum: CategoryPosition })
  position: CategoryPosition;

  @Column({ type: 'enum', enum: CategoryStatus })
  status: CategoryStatus;

  @Column({ default: null })
  icon: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // (1 service categories can have many services)

  // @OneToMany(() => Service, (service) => service.category, { cascade: true })
  // services: Service[];
}
