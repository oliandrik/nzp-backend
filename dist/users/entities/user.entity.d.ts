import { ERoles } from 'src/auth/interfaces/roles.interfaces';
export declare class User {
    id: number;
    email: string;
    password: string;
    role: ERoles;
}
