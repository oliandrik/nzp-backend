import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum CategoryPosition {
  top = 'top',
  bottom = 'bottom',
}

export enum CategoryStatus {
  enable = 'enable',
  disable = 'disable',
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
