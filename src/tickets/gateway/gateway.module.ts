import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from 'src/clients/clients.module';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway.gateway';
import { GatewayService } from './gateway.service';

@Module({
  imports: [UsersModule, ClientsModule, AuthModule],
  providers: [GatewayGateway, GatewayService],
  exports: [GatewayGateway],
})
export class GatewayModule {}
