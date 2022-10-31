import { SetMetadata } from '@nestjs/common';
import { ERoles } from '../interfaces/roles.interfaces';

export const HasRoles = (...roles: ERoles[]) => SetMetadata('roles', roles);
