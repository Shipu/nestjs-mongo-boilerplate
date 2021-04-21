import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GROUP_KEY } from '../decorators/groups.decorator';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredGroups = this.reflector.getAllAndOverride(GROUP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredGroups) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return (
      requiredGroups.some((group: string) => user.groups?.includes(group)) ||
      user.is_superuser
    );
  }
}
