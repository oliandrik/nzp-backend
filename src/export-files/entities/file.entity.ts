import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'export_files' })
export class ExportFile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  filename: string;

  @Column()
  export_for: string;

  @Column()
  createdAt: Date;
}
