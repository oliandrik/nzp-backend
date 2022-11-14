import { Strategy } from 'passport-jwt';
import { ClientsService } from 'src/clients/clients.service';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private clientService;
    private userService;
    constructor(clientService: ClientsService, userService: UsersService);
    validate(payload: any): Promise<import("../../clients/entities/client.entity").Client | {
        message: string;
    }>;
}
export {};
