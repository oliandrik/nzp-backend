import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EIsAllowedPaymentMenthod } from '../interfaces/payment-method.interfaces';

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  payment_method: string;

  @Column()
  payment_name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
  minimal_payment: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
  maximal_payment: number;

  @Column({ type: 'enum', enum: EIsAllowedPaymentMenthod })
  is_allowed: EIsAllowedPaymentMenthod;

  @Column()
  visibility: boolean;

  @Column({ default: null })
  instruction: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
