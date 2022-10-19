import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { EActivationMultiCurrency } from '../interfaces/multi-currency.interfaces';

@Entity({ name: 'multi_currency' })
export class MultiCurrency {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  currency: string;

  @Column()
  currency_name: string;

  @Column({ type: 'enum', enum: EActivationMultiCurrency })
  activation: EActivationMultiCurrency;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
