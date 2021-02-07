import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const groups = this.reflector.get<string[]>('groups', context.getHandler());
    if (!groups) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.hasGroups(user.groups, groups);
  }

  hasGroups(userGroup, accessGroup) {
    if (!userGroup) return false;

    if (!accessGroup) return true;

    return accessGroup.some((v) => userGroup.includes(v));
  }
}