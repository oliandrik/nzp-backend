import { ExportFilesModule } from 'src/export-files/export-files.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntityService } from './client-entity.service';
import { AdminClientsController } from './controllers/admin-clients.controller';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';
import { ReferralSystem } from './entities/referral-system.entity';

import { AdminClientsService } from './services/admin-clients.service';
import { ClientsService } from './services/clients.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, ReferralSystem]),
    ExportFilesModule,
  ],
  controllers: [ClientsController, AdminClientsController],
  providers: [ClientsService, ClientEntityService, AdminClientsService],
  exports: [ClientsService, ClientEntityService, AdminClientsService],
})
export class ClientsModule {}
