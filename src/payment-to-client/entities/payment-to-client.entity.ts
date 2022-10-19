import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payment_to_client' })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Client)
  @Index()
  client: Client;

  @ManyToOne(() => PaymentMethod)
  @Index()
  payment_method: PaymentMethod;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
