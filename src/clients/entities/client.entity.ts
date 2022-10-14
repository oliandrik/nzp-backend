import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ClientStatus {
  active = 'active',
  suspended = 'suspended',
  unconfirmed = 'unconfirmed',
}

export enum ClientGender {
  other = 'other',
  female = 'female',
  male = 'male',
}

export enum ClientRank {
  new = 'new',
  bronze = 'bronze',
  silver = 'silver',
  gold = 'gold',
  platinum = 'platinum',
  diamon = 'diamond',
  vip = 'VIP',
  vip_3 = 'VIP III',
}

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

  @Column({ type: 'enum', enum: ClientRank })
  rank: ClientRank.new;

  @Column({ type: 'enum', enum: ClientStatus })
  status: ClientStatus;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: ClientGender })
  gender: ClientGender;

  @Column()
  createdAt: Date;

  @Column()
  lastAuth: null | Date;
}
