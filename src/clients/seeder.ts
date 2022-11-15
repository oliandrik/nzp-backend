import { seeder } from 'nestjs-seeder';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSeeder } from './clients.seeder';
import { Client } from './entities/client.entity';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.HOST_DATABASE}`,
      port: 3306,
      username: `${process.env.USERNAME_DATABASE}`,
      password: `${process.env.PASSWORD_DATABASE}`,
      database: `${process.env.DATABASE}`,
      entities: [Client],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Client]),
  ],
}).run([ClientSeeder]);
