import { ClientDto } from 'src/clients/dto/client.dto';
import { AuthService } from './auth.service';
import { SignIn } from './dto/signin.dto';
import { SignUp } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUp: SignUp): Promise<{
        refreshToken: string;
        accessToken: string;
        message: string;
        user: {
            id: any;
            email: any;
        };
    }>;
    signUpAdmin(signUp: any): Promise<{
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
    changePassword(clientDto: ClientDto, id: number): Promise<{
        message: string;
    }>;
    sendNewPassword(body: ClientDto): Promise<{
        message: string;
    }>;
    adminSignIn(signIn: SignIn): Promise<{
        message: string;
        accessToken: string;
    }>;
    getMe(req: any): any;
}
