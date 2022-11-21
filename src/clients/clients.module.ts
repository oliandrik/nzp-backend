import { ExportFilesModule } from 'src/export-files/export-files.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { InjectService } from './inject.service';

import { AdminClientsService } from './services/admin-clients.service';
import { ClientsService } from './services/clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ExportFilesModule],
  controllers: [ClientsController],
  providers: [ClientsService, InjectService, AdminClientsService],
  exports: [ClientsService, InjectService, AdminClientsService],
})
export class ClientsModule {}
