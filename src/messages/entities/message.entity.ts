import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  text: string;

  @Column()
  sent_datetime: Date;

  @ManyToOne(() => Ticket)
  ticket: Ticket;

  @Column()
  is_user: string; //client or admin

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
