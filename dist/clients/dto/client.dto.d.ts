import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { EClientGender } from '../interfaces/client.interfaces';
export declare class ClientDto {
    id: bigint;
    username: string;
    email: string;
    password: string;
    balance: number;
    spent: number;
    avatar: string;
    gender: EClientGender;
    role: ERoles;
}
