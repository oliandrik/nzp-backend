import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {
  EClientGender,
  EClientRank,
  EClientStatus,
} from '../interfaces/client.interfaces';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  terms: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  balance: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  spent: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  discount: number;

  @Column({ type: 'enum', enum: EClientRank })
  rank: EClientRank;

  @Column({ type: 'enum', enum: EClientStatus })
  status: EClientStatus;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: EClientGender })
  gender: EClientGender;

  @Column({ type: 'enum', enum: ERoles })
  role: ERoles;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  lastAuth: null | Date;
}
