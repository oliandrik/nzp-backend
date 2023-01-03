import { Client } from 'src/clients/entities/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chat_messages' })
export class ChatMessage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('text', { nullable: true })
  content: string;

  @ManyToOne(() => Client)
  client: Client;
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
