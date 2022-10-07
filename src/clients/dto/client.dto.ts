import { ClientGender } from '../entity/client.entity';

export class ClientDto {
  id: bigint;
  username: string;
  email: string;
  password: string;
  balance: number;
  spent: number;
  avatar: string;
  gender: ClientGender;
}
