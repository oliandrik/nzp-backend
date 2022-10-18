import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EOrderStatus } from '../interfaces/order.interfaces';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  client: string; //change it

  @Column({ type: 'numeric', precision: 30, scale: 10 })
  charge: number;

  @Column()
  link: string;

  @Column()
  start_count: number;

  @Column()
  quantity: number;

  @Column()
  service: string; //change it

  @Column()
  status: EOrderStatus;

  @Column()
  remains: number;

  @Column()
  created_at: Date;
}
