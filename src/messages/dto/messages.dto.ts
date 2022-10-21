import { Ticket } from 'src/tickets/entities/ticket.entity';

export class MessageDto {
  id: number;
  text: string;
  sent_datetime: Date;
  ticket: Ticket;
  is_user: string; //client or admin
}
