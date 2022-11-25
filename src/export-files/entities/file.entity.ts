import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'export_files' })
export class ExportFile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  filename: string;

  @Column()
  fromDate: string;

  @Column()
  toDate: string;

  @Column()
  status: string;

  @Column()
  format: string;

  @Column()
  export_for: string;

  @Column()
  created_at: Date;
}
