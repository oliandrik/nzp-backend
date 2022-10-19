import { EApprovePayouts } from '../interfaces/affiliate-system.interfaces';

export class AffiliateSystemDto {
  commission_rate: number;
  minimum_payout: number;
  approve_payouts: EApprovePayouts;
}
