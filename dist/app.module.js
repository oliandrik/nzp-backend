"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const affiliate_system_module_1 = require("./affiliate-system/affiliate-system.module");
const affiliate_system_entity_1 = require("./affiliate-system/entities/affiliate-system.entity");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const average_time_module_1 = require("./average-time/average-time.module");
const average_time_entity_1 = require("./average-time/entities/average-time.entity");
const bonuses_module_1 = require("./bonuses/bonuses.module");
const bonus_entity_1 = require("./bonuses/entities/bonus.entity");
const chat_module_1 = require("./chat/chat.module");
const clients_module_1 = require("./clients/clients.module");
const client_entity_1 = require("./clients/entities/client.entity");
const file_entity_1 = require("./export-files/entities/file.entity");
const export_files_module_1 = require("./export-files/export-files.module");
const general_settings_entity_1 = require("./general-settings/entities/general-settings.entity");
const general_settings_module_1 = require("./general-settings/general-settings.module");
const multi_currency_entity_1 = require("./multi-currency/entities/multi-currency.entity");
const multi_currency_module_1 = require("./multi-currency/multi-currency.module");
const order_entity_1 = require("./orders/entities/order.entity");
const orders_module_1 = require("./orders/orders.module");
const payment_method_entity_1 = require("./payment-methods/entities/payment-method.entity");
const payment_methods_module_1 = require("./payment-methods/payment-methods.module");
const payment_to_client_module_1 = require("./payment-to-client/payment-to-client.module");
const provider_entity_1 = require("./providers/entities/provider.entity");
const providers_module_1 = require("./providers/providers.module");
const ticket_entity_1 = require("./tickets/entities/ticket.entity");
const tickets_module_1 = require("./tickets/tickets.module");
const updates_entity_1 = require("./updates/entities/updates.entity");
const updates_module_1 = require("./updates/updates.module");
const user_entity_1 = require("./users/entities/user.entity");
const users_module_1 = require("./users/users.module");
const service_categories_entity_1 = require("./service-categories/entities/service-categories.entity");
const service_categories_module_1 = require("./service-categories/service-categories.module");
const service_entity_1 = require("./services/entities/service.entity");
const services_module_1 = require("./services/services.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: `${process.env.HOST_DATABASE}`,
                port: 3306,
                username: `${process.env.USERNAME_DATABASE}`,
                password: `${process.env.PASSWORD_DATABASE}`,
                database: `${process.env.DATABASE}`,
                entities: [
                    user_entity_1.User,
                    client_entity_1.Client,
                    service_categories_entity_1.ServiceCategory,
                    service_entity_1.Service,
                    payment_method_entity_1.PaymentMethod,
                    file_entity_1.ExportFile,
                    order_entity_1.Order,
                    general_settings_entity_1.GeneralSetting,
                    bonus_entity_1.Bonus,
                    affiliate_system_entity_1.AffiliateSystem,
                    average_time_entity_1.AverageTime,
                    multi_currency_entity_1.MultiCurrency,
                    provider_entity_1.Provider,
                    ticket_entity_1.Ticket,
                    updates_entity_1.Update,
                ],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            auth_module_1.AuthModule,
            services_module_1.ServicesModule,
            service_categories_module_1.ServiceCategoriesModule,
            payment_methods_module_1.PaymentMethodsModule,
            export_files_module_1.ExportFilesModule,
            orders_module_1.OrdersModule,
            general_settings_module_1.GeneralSettingsModule,
            bonuses_module_1.BonusesModule,
            affiliate_system_module_1.AffiliateSystemModule,
            payment_to_client_module_1.PaymentToClientModule,
            average_time_module_1.AverageTimeModule,
            multi_currency_module_1.MultiCurrencyModule,
            providers_module_1.ProvidersModule,
            tickets_module_1.TicketsModule,
            chat_module_1.ChatModule,
            updates_module_1.UpdatesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map