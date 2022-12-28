import { AdminAffiliationSystem } from './affiliation-system/entities/admin-affiliate-system.entity';
import { AverageTime } from './average-time/entities/average-time.entity';
import { Bonus } from './bonuses/entities/bonus.entity';
import { Client } from './clients/entities/client.entity';
import { ReferralSystem } from './clients/entities/referral-system.entity';
import { ExportFile } from './export-files/entities/file.entity';
import { GeneralSetting } from './general-settings/entities/general-settings.entity';
import { MultiCurrency } from './multi-currency/entities/multi-currency.entity';
import { Order } from './orders/entities/order.entity';
import { PaymentMethod } from './payment-methods/entities/payment-method.entity';
import { Provider } from './providers/entities/provider.entity';
import { MessageAttachment } from './tickets/entities/message-attachment.entity';
import { Message } from './tickets/entities/message.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { Update } from './updates/entities/updates.entity';
import { User } from './users/entities/user.entity';

import { ServiceCategory } from './service-categories/entities/service-categories.entity';
import { InternalService } from './services/entities/internal-service.entity';
import { Service } from './services/entities/service.entity';

const entities = [
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
  Message,
  MessageAttachment,
];

export default entities;

export {
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
  Message,
  MessageAttachment,
};
