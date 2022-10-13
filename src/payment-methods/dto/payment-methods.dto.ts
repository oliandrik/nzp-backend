import { AllowedForNewUser } from '../entities/payment-method.entity';

export class PaymentMethodDto {
  id: bigint;
  method_name: string;
  minimal_payment: number;
  maximal_payment: number;
  new_users: AllowedForNewUser;
  instruction: string;
}
