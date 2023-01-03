import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ticket } from './ticket.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  content: string;

  @ManyToOne(() => Client, (client) => client.messages)
  client: Client;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Ticket, (conversation) => conversation.messages)
  ticket: Ticket;

  @Column()
  created_at: Date;
}
