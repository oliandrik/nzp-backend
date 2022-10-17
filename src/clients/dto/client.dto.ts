import { EClientGender } from '../interfaces/client.interfaces';

export class ClientDto {
  id: bigint;
  username: string;
  email: string;
  password: string;
  balance: number;
  spent: number;
  avatar: string;
  gender: EClientGender;
}
