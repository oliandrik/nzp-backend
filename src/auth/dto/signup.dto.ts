import { IsDefined, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ClientStatus } from 'src/clients/entity/client.entity';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  readonly username: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsDefined()
  @IsNotEmpty()
  readonly terms: boolean;

  readonly balance: null | number;

  readonly spent: null | number;

  readonly status: null | ClientStatus;

  readonly avatar: null;

  readonly gender: null;
}
