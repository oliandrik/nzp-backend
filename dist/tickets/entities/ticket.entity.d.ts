import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { ETicketStatus } from '../interfaces/ticket.interfaces';
export declare class Ticket {
    id: bigint;
    client: Client;
    user: User;
    subject: string;
    status: ETicketStatus;
    created_at: Date;
    updated_at: Date;
}
