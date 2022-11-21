import { ExportFilesModule } from 'src/export-files/export-files.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';
import { ClientEntityService } from './client-entity.service';

import { AdminClientsService } from './services/admin-clients.service';
import { ClientsService } from './services/clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ExportFilesModule],
  controllers: [ClientsController],
  providers: [ClientsService, ClientEntityService, AdminClientsService],
  exports: [ClientsService, ClientEntityService, AdminClientsService],
})
export class ClientsModule {}
