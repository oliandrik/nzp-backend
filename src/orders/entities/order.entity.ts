import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EOrderStatus } from '../interfaces/order.interfaces';

@Entity({ name: 'orders' })
@Index(['client', 'service'])
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Client)
  @Index()
  client: Client;

  @Column({ type: 'numeric', precision: 30, scale: 10 })
  charge: number;

  @Column()
  link: string;

  @Column()
  start_count: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Service)
  @Index()
  service: Service;

  @Column()
  status: EOrderStatus;

  @Column()
  remains: number;

  @Column()
  @Index()
  mode: number;

  @Column()
  created_at: Date;
}
