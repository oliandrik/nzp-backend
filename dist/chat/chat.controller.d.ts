import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    private readonly chatGetaway;
    constructor(chatService: ChatService, chatGetaway: ChatGateway);
    sendMessage(body: any, user: any): Promise<any>;
}
