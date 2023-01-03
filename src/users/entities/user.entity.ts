import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { Message } from 'src/tickets/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ERoles })
  role: ERoles;

  @OneToMany(() => Message, (message) => message.user)
  @JoinColumn()
  messages: Message[];
}
