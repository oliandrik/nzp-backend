import { UserRole } from '../entities/user.entity';

export class UserDto {
  id: bigint;
  email: string;
  password: string;
  role: UserRole;
}
