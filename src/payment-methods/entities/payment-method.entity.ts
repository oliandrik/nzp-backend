import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  payment_name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
