import { Observable } from 'rxjs';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ERoles } from '../interfaces/roles.interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user, client }: { user: User; client: Client } = context
      .switchToHttp()
      .getRequest();

    return (
      requiredRoles.some((role) => user.role?.includes(role)) ||
      requiredRoles.some((role) => client.role?.includes(role))
    );
  }
}
