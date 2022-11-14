import { EIsAllowedForNewUser } from '../interfaces/payment-method.interfaces';
export declare class PaymentMethodDto {
    id: bigint;
    method_name: string;
    minimal_payment: number;
    maximal_payment: number;
    is_allowed_for_new_users: EIsAllowedForNewUser;
    instruction: string;
}
