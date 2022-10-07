import { UserRole } from '../entity/user.entity';

export class UserDto {
  id: bigint;
  email: string;
  password: string;
  role: UserRole;
}
