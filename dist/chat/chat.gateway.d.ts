import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
export declare class ChatGateway {
    private readonly chatService;
    private authService;
    private userService;
    constructor(chatService: ChatService, authService: AuthService, userService: UsersService);
    server: any;
    handleSendMessage(client: Socket, payload: Chat): Promise<void>;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    sendMessageTo(clientId: any, userId: any, message: any): Promise<any>;
}
