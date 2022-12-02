import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'providers' })
export class Provider {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  provider_name: string;

  @Column()
  provider_url: string;

  @Column({ default: null })
  alias: string;

  @Column({ default: 0 })
  balance: number;

  @Column()
  API_key: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
