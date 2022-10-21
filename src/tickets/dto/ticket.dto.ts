import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';

import { ETicketStatus } from '../interfaces/ticket.interfaces';

export class TicketDto {
  id: bigint;
  client: Client;
  user: User;
  subject: string;
  status: ETicketStatus;
}
