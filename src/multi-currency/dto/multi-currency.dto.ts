import { EActivationMultiCurrency } from '../interfaces/multi-currency.interfaces';

export class MultiCurrencyDto {
  id: bigint;
  currency: string;
  currency_name: string;
  activation: EActivationMultiCurrency;
}
