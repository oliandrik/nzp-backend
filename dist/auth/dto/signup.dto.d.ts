import { EClientStatus } from 'src/clients/interfaces/client.interfaces';
export declare class SignUp {
    username: string;
    email: string;
    password: string;
    terms: boolean;
    balance: null | number;
    spent: null | number;
    status: EClientStatus;
    avatar: null;
    gender: null;
}
