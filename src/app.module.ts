import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliationSystemModule } from './affiliation-system/affiliation-system.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AverageTimeModule } from './average-time/average-time.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { ChatModule } from './chat/chat.module';
import { ClientsModule } from './clients/clients.module';
import entities from './entities';
import { ExportFilesModule } from './export-files/export-files.module';
import { GeneralSettingsModule } from './general-settings/general-settings.module';
import { MultiCurrencyModule } from './multi-currency/multi-currency.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PaymentToClientModule } from './payment-to-client/payment-to-client.module';
import { ProvidersModule } from './providers/providers.module';
import { TestModule } from './test/test.module';
import { GatewayModule } from './tickets/gateway/gateway.module';
import { MessageAttachmentModule } from './tickets/message-attachment/message-attachment.module';
import { MessagesModule } from './tickets/messages/messages.module';
import { TicketsModule } from './tickets/tickets.module';
import { UpdatesModule } from './updates/updates.module';
import { UsersModule } from './users/users.module';

import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServicesModule } from './services/services.module';

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
      synchronize: true,
      entities,
    }),
    UsersModule,
    ClientsModule,
    AuthModule,
    ServicesModule,
    ServiceCategoriesModule,
    PaymentMethodsModule,
    ExportFilesModule,
    OrdersModule,
    GeneralSettingsModule,
    BonusesModule,
    AffiliationSystemModule,
    PaymentToClientModule,
    AverageTimeModule,
    MultiCurrencyModule,
    ProvidersModule,
    // TicketsModule,
    // ChatModule,
    UpdatesModule,
    TestModule,
    // MessagesModule,
    // MessageAttachmentModule,
    // GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
