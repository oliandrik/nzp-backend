import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliationSystemModule } from './affiliation-system/affiliation-system.module';
import { AdminAffiliationSystem } from './affiliation-system/entities/admin-affiliate-system.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AverageTimeModule } from './average-time/average-time.module';
import { AverageTime } from './average-time/entities/average-time.entity';
import { BonusesModule } from './bonuses/bonuses.module';
import { Bonus } from './bonuses/entities/bonus.entity';
import { ChatModule } from './chat/chat.module';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { ReferralSystem } from './clients/entities/referral-system.entity';
import { ExportFile } from './export-files/entities/file.entity';
import { ExportFilesModule } from './export-files/export-files.module';
import { GeneralSetting } from './general-settings/entities/general-settings.entity';
import { GeneralSettingsModule } from './general-settings/general-settings.module';
import { MultiCurrency } from './multi-currency/entities/multi-currency.entity';
import { MultiCurrencyModule } from './multi-currency/multi-currency.module';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { PaymentMethod } from './payment-methods/entities/payment-method.entity';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PaymentToClientModule } from './payment-to-client/payment-to-client.module';
import { Provider } from './providers/entities/provider.entity';
import { ProvidersModule } from './providers/providers.module';
import { StripeModule } from './stripe/stripe.module';
import { Ticket } from './tickets/entities/ticket.entity';
import { TicketsModule } from './tickets/tickets.module';
import { Update } from './updates/entities/updates.entity';
import { UpdatesModule } from './updates/updates.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

import { ServiceCategory } from './service-categories/entities/service-categories.entity';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { InternalService } from './services/entities/internal-service.entity';
import { Service } from './services/entities/service.entity';
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
      entities: [
        User,
        Client,
        ReferralSystem,
        ServiceCategory,
        Service,
        InternalService,
        PaymentMethod,
        ExportFile,
        Order,
        GeneralSetting,
        Bonus,
        AdminAffiliationSystem,
        AverageTime,
        MultiCurrency,
        Provider,
        Ticket,
        Update,
      ],
      synchronize: true,
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
    TicketsModule,
    ChatModule,
    UpdatesModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
