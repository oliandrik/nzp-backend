import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { EActivationAverageTime } from '../interfaces/average-time.interfaces';

@Entity({ name: 'average_time' })
export class AverageTime {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  display_on: string;

  @Column({ type: 'enum', enum: EActivationAverageTime })
  activation: EActivationAverageTime;

  @Column()
  updated_at: Date;
}
