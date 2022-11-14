import { TicketDto } from './dto/ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    getAllTickets(): Promise<Ticket[]>;
    searchById(query: any): Promise<Ticket>;
    searchBySubject(param: any, query: any): Promise<Ticket[]>;
    searchByClient(query: any): Promise<Ticket[]>;
    getTicketmById(id: any): Promise<Ticket>;
    createTicket(body: TicketDto): Promise<{
        message: string;
    }>;
    updateTicket(id: any, body: TicketDto): Promise<{
        message: string;
    }>;
    bulkDelete(body: any): Promise<{
        message: string;
    }>;
    deleteTicket(id: any): Promise<{
        message: string;
    }>;
}
