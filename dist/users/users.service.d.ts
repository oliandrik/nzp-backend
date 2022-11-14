import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    byEmail(data: any): Promise<{
        message: string;
    }>;
    byId(id: any): Promise<User>;
}
