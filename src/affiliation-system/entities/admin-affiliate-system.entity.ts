import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { EApprovePayouts } from '../interfaces/affiliate-system.interfaces';

@Entity({ name: 'admin_affiliation_system' })
export class AdminAffiliationSystem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  commission_rate: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  minimum_payout: number;

  @Column({ type: 'enum', enum: EApprovePayouts })
  approve_payouts: EApprovePayouts;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
