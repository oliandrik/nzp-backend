import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

import { ServiceCategory } from './service-categories/entities/service-categories.entity';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { Service } from './services/entities/service.entity';
import { ServicesModule } from './services/services.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';

@Module({
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
      entities: [User, Client, ServiceCategory, Service],
      synchronize: true,
    }),
    UsersModule,
    ClientsModule,
    AuthModule,
    ServicesModule,
    ServiceCategoriesModule,
    PaymentMethodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
