import { Repository } from 'typeorm';
import { ChatMessage } from '../entities/message.entity';
export declare class MessagesService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<ChatMessage>);
    create(message: any): Promise<import("typeorm").InsertResult>;
}
