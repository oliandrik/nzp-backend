import { PaymentMethod } from 'src/payment-methods/entities/payment-method.entity';
import { EBonusStatus } from '../interfaces/bonus.interfaces';
export declare class Bonus {
    id: number;
    bonus_amount: number;
    for_method: PaymentMethod;
    deposit_from: number;
    status: EBonusStatus;
    created_at: Date;
    updated_at: Date;
}
