import { Service } from 'src/services/entities/service.entity';
import { EServiceStatus } from 'src/services/interfaces/service.interfaces';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'updates' })
export class Update {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Service)
  service: Service;

  @Column({ type: 'enum', enum: EServiceStatus })
  new_status: EServiceStatus;

  @Column({ type: 'enum', enum: EServiceStatus })
  old_status: EServiceStatus;

  @Column()
  old_rate_per: number;

  @Column()
  new_rate_per: number;

  @Column()
  mark: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
