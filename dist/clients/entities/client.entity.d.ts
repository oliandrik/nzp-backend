import { ERoles } from 'src/auth/interfaces/roles.interfaces';
import { EClientGender, EClientRank, EClientStatus } from '../interfaces/client.interfaces';
export declare class Client {
    id: number;
    username: string;
    email: string;
    password: string;
    terms: boolean;
    balance: number;
    spent: number;
    discount: number;
    rank: EClientRank;
    status: EClientStatus;
    avatar: string;
    gender: EClientGender;
    role: ERoles;
    created_at: Date;
    updated_at: Date;
    lastAuth: null | Date;
}
