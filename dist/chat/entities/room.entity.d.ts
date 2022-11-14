import { Client } from 'src/clients/entities/client.entity';
export declare class Room {
    id: number;
    client: Client;
    email: string;
    created_at: Date;
    updated_at: Date;
}
