import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Client } from './client.entity';

@Entity('referral-system')
export class ReferralSystem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  referral_link: string;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column()
  created_at: Date;
}
