import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Message } from './message.entity';
import { ETicketStatus } from '../interfaces/ticket.interfaces';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @OneToMany(() => Message, (message) => message.ticket, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  messages: Message[];

  @OneToOne(() => Order, (order) => order.ticket)
  @JoinColumn()
  order: Order;

  @Column({ default: null, type: 'text' })
  subject: string;
  // @Column({ type: 'enum', enum: ETicketStatus })
  // status: ETicketStatus;

  @Column()
  created_at: Date;

  // @Column()
  // updated_at: Date;
}
