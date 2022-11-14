import { ERoles } from 'src/auth/interfaces/roles.interfaces';
export declare class UserDto {
    id: bigint;
    email: string;
    password: string;
    role: ERoles;
}
