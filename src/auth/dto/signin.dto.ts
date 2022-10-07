import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignIn {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
