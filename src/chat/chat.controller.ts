import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

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
}
