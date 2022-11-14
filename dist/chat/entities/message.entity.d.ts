import { Client } from 'src/clients/entities/client.entity';
export declare class ChatMessage {
    id: number;
    text: string;
    client: Client;
    created_at: Date;
    updated_at: Date;
}
