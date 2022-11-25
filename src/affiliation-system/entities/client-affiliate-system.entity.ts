import { Client } from 'src/clients/entities/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'client_affiliation_system' })
export class ClientAffiliationSystem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  code: string;

  @Column()
  link: string;

  @Column()
  visits: number;

  @Column()
  referrals: number;

  @Column()
  registrations: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_earnings: number;

  @OneToOne(() => Client)
  client: Client;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
