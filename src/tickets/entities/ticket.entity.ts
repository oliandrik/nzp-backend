import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ETicketStatus } from '../interfaces/ticket.interfaces';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => User)
  user: User;

  @Column()
  subject: string;

  @Column({ type: 'enum', enum: ETicketStatus })
  status: ETicketStatus;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
