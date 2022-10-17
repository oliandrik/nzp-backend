import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IsAllowedForNewUser } from '../interfaces/payment-method.interfaces';

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  method_name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
  minimal_payment: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
  maximal_payment: number;

  @Column({ type: 'bool' })
  is_allowed_for_new_users: boolean;

  @Column({ default: null })
  instruction: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
