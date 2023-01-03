import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageAttachmentController } from './message-attachment.controller';
import { MessageAttachmentService } from './message-attachment.service';
import { MessageAttachment } from '../entities/message-attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageAttachment])],
  controllers: [MessageAttachmentController],
  providers: [MessageAttachmentService],
  exports: [MessageAttachmentService],
})
export class MessageAttachmentModule {}
