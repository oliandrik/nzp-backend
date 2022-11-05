import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from 'src/clients/clients.module';
import { UsersModule } from 'src/users/users.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/message.entity';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [
    AuthModule,
    ClientsModule,
    UsersModule,
    TypeOrmModule.forFeature([ChatMessage, Chat]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, MessagesService],
})
export class ChatModule {}
