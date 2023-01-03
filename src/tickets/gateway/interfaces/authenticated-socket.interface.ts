import { Socket } from 'socket.io';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';

export interface AuthenticatedSocket extends Socket {
  user?: User | Client;
}
