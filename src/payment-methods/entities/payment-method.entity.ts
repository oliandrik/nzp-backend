import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AllowedForNewUser {
  allowed = 'allowed',
  disallowed = 'disallowed',
}
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

  @Column()
  new_users: AllowedForNewUser;

  @Column({ default: null })
  instruction: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
