import { PaymentMethod } from 'src/payment-methods/entities/payment-method.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { EBonusStatus } from '../interfaces/bonus.interfaces';

@Entity({ name: 'bonuses' })
export class Bonus {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  bonus_amount: number;

  @OneToOne(() => PaymentMethod)
  for_method: PaymentMethod;

  @Column()
  deposit_from: number;

  @Column({ type: 'enum', enum: EBonusStatus })
  status: EBonusStatus;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
