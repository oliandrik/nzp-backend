import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  //   ManyToOne,
  //   OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  //   @OneToOne(() => Client)
  @ManyToMany(() => Client)
  client: Client;

  //   @ManyToOne(() => User)
  //   user: User;

  @Column({ type: 'text' })
  text: string;

  @Column()
  created_at: Date;
}
