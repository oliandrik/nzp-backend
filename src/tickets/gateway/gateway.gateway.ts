import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Client, User } from 'src/entities';

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { AuthenticatedSocket } from './interfaces/authenticated-socket.interface';

@WebSocketGateway(
  { cors: { origin: '*' } },
  //   {
  //   cors: {
  //     origin: ['http://localhost:3000'],
  //     credentials: true,
  //   },
  // pingInterval: 10000,
  // pingTimeout: 15000,
  // }
)
export class GatewayGateway {
  constructor(
    private readonly gatewayService: GatewayService,
    private authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming Connection');

    const person =
      (this.authService.decodedJwtAccessToken(
        socket.handshake.headers.authorization,
      ) as Client) ||
      (this.authService.decodedJwtAccessToken(
        socket.handshake.headers.authorization,
      ) as User);

    this.gatewayService.userConnected(person);
    socket.emit('connected', {});
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    const person =
      (this.authService.decodedJwtAccessToken(
        socket.handshake.headers.authorization,
      ) as Client) ||
      (this.authService.decodedJwtAccessToken(
        socket.handshake.headers.authorization,
      ) as User);

    console.log('handleDisconnect');
    console.log(`${person.id} disconnected.`);
  }

  @SubscribeMessage('onTypingStart')
  onTypingStart(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('onTypingStart');
    console.log(data);
    return data;
  }

  @SubscribeMessage('onTypingStop')
  onTypingStop(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('onTypingStop');
    console.log(data.ticketId);
    client.to(`conversation-${data.ticketId}`).emit('onTypingStop');
  }

  @SubscribeMessage('onTypingStop')
  createMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('create message');
  }
}
