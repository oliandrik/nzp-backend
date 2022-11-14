import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
export declare class TicketsService {
    private readonly ticketRepository;
    constructor(ticketRepository: Repository<Ticket>);
    findAll(): Promise<Ticket[]>;
    byId(id: any): Promise<Ticket>;
    bySubject(subject: any): Promise<Ticket[]>;
    byClient(client: any): Promise<Ticket[]>;
    create(body: any): Promise<{
        message: string;
    }>;
    update(id: any, body: any): Promise<{
        message: string;
    }>;
    deleteOne(id: number): Promise<{
        message: string;
    }>;
    bulkDelete(ids: []): Promise<{
        message: string;
    }>;
}
