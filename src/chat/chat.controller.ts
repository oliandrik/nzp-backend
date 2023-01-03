import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Client } from 'src/clients/entities/client.entity';

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGetaway: ChatGateway,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async sendMessage(@Body() body, @CurrentUser() user) {
    // store to database
    // validation
    return this.chatGetaway.sendMessageTo(user.id, body.to, body.message);
  }

  // @Post()
  // async createConversation(
  //   @CurrentUser() user: Client,
  //   @Body() createConversationPayload,
  // ) {
  //   const conversation = await this.chatService.createConversation(
  //     user,
  //     createConversationPayload,
  //   );

  //   this.events.emit('conversation.create', conversation);
  //   return conversation;
  // }
}
