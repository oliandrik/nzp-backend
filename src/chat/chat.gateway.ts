import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Client } from 'src/clients/entities/client.entity';
import { UsersService } from 'src/users/users.service';

import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';

@WebSocketGateway(8001, { cors: { origin: '*' } })
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @WebSocketServer()
  server;

  async handleSendMessage(client: Socket, payload: Chat): Promise<void> {
    await this.chatService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

  // client send it
  // reverse
  async handleConnection(socket: Socket) {
    const client = (await this.authService.decodedJwtAccessToken(
      socket.handshake.headers.authorization,
    )) as Client;

    const user = await this.userService.byId(socket.handshake.headers.to);

    if (client && user) {
      socket.join(client.id + '-' + user.id);
      this.server.to(client.id + '-' + user.id).emit('message', 'hello guys');
    }
  }

  handleDisconnect(client: Socket) {
    console.log('on disconnect');
  }

  async sendMessageTo(clientId, userId, message) {
    return this.server.to(clientId + '-' + userId).emit('message', message);
  }
}
