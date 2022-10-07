import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  admin = 'admin',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
