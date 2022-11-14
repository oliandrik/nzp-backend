import { EBonusStatus } from '../interfaces/bonus.interfaces';
export declare class BonusDto {
    id: number;
    bonus_amount: number;
    for_method: string;
    deposit_from: number;
    status: EBonusStatus;
}
