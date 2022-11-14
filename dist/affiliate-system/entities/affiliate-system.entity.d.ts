import { EApprovePayouts } from '../interfaces/affiliate-system.interfaces';
export declare class AffiliateSystem {
    id: number;
    commission_rate: number;
    minimum_payout: number;
    approve_payouts: EApprovePayouts;
    created_at: Date;
    updated_at: Date;
}
