import { Client } from 'src/clients/entities/client.entity';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignIn } from './dto/signin.dto';
import { SignUp } from './dto/signup.dto';
export declare class AuthService {
    private readonly clientRepository;
    private readonly userRepository;
    private readonly jwtService;
    constructor(clientRepository: Repository<Client>, userRepository: Repository<User>, jwtService: JwtService);
    signUp(signUp: SignUp): Promise<{
        refreshToken: string;
        accessToken: string;
        message: string;
        user: {
            id: any;
            email: any;
        };
    }>;
    signUpAdmin(signUp: UserDto): Promise<{
        refreshToken: string;
        accessToken: string;
        message: string;
        user: {
            id: any;
            email: any;
        };
    }>;
    signIn(signIn: SignIn): Promise<{
        message: string;
        accessToken: string;
    }>;
    validateUser(signIn: SignIn): Promise<Client | User>;
    issueTokenPair(userId: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    returnUserFields(user: any): {
        id: any;
        email: any;
    };
    changePassword(client: any, id: any): Promise<{
        message: string;
    }>;
    sendNewPassword(payload: any): Promise<{
        message: string;
    }>;
    decodedJwtAccessToken(token: any): string | {
        [key: string]: any;
    };
}
