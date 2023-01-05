import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { Message } from 'src/tickets/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import {
  EUserGender,
  EUserRank,
  EUserStatus,
} from '../interfaces/user.interfaces';

@Entity({ name: 'people' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ERoles, default: ERoles.USER })
  role: ERoles;

  @OneToMany(() => Message, (message) => message.user)
  @JoinColumn()
  messages: Message[];

  @Column()
  terms: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  balance: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  spent: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  discount: number;

  @Column({ type: 'enum', enum: EUserRank })
  rank: EUserRank;

  @Column({ type: 'enum', enum: EUserStatus })
  status: EUserStatus;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: EUserGender })
  gender: EUserGender;

  @Column({ default: null })
  whatsapp: string;

  @Column({ default: false })
  is_confirmed_email: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ default: null })
  lastAuth: Date;
}
