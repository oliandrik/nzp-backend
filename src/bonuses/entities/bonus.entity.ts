import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { EBonusStatus } from '../interfaces/bonus.interfaces';

@Entity({ name: 'bonuses' })
export class Bonus {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  bonus_amount: number;

  @Column({ unique: true })
  for_method: string; // relation payment methods

  @Column()
  deposit_from: number;

  @Column({ type: 'enum', enum: EBonusStatus })
  status: EBonusStatus;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
