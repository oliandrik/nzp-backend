import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { EUserStatus } from 'src/users/interfaces/user.interfaces';

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
  status: EUserStatus;
  avatar: null;
  gender: null;
  whatsapp: null;
  is_confirmed_email: boolean;
}
