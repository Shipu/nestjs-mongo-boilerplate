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
    // if(!request.user)
    console.log(user.groups);
    this.hasGroups(user.groups, groups);
    // return matchRoles(groups, user.groups);
    return true;
  }

  hasGroups(userGroup, accessGroup) {
    console.log(accessGroup.some((v) => userGroup.includes(v)));
  }
}