import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  async getMessages(@Param('id') id) {
    return await this.messagesService.getMessages(id);
  }
}
