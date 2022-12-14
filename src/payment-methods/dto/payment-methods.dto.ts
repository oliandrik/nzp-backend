import { EIsAllowedPaymentMenthod } from '../interfaces/payment-method.interfaces';

export class PaymentMethodDto {
  id: bigint;
  method_name: string;
  minimal_payment: number;
  maximal_payment: number;
  is_allowed_for_new_users: EIsAllowedPaymentMenthod;
  instruction: string;
}
