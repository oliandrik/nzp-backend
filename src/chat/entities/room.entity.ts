import { Client } from 'src/clients/entities/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Client)
  client: Client;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
