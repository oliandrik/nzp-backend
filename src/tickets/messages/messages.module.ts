import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message } from '../entities/message.entity';
import { MessageAttachmentModule } from '../message-attachment/message-attachment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), MessageAttachmentModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
