import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { EClientStatus } from 'src/clients/interfaces/client.interfaces';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  terms: boolean;

  balance: null | number;
  spent: null | number;
  status: EClientStatus;
  avatar: null;
  gender: null;
}
