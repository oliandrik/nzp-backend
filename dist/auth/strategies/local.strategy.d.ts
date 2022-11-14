/// <reference types="passport" />
import { AuthService } from '../auth.service';
import { SignIn } from '../dto/signin.dto';
declare const LocalStrategy_base: new (...args: any[]) => import("passport").Strategy & import("passport").StrategyCreatedStatic;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(signIn: SignIn): Promise<{
        message: string;
        accessToken: string;
    }>;
}
export {};
