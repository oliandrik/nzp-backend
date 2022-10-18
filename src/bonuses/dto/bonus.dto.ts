import { EBonusStatus } from '../interfaces/bonus.interfaces';

export class BonusDto {
  id: number;
  bonus_amount: number;
  for_method: string; // relation payment methods
  deposit_from: number;
  status: EBonusStatus;
}
