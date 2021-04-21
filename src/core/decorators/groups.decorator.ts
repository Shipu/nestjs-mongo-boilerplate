import { SetMetadata } from '@nestjs/common';

export const GROUP_KEY = 'groups';
export const Groups = (...groups: string[]) => SetMetadata(GROUP_KEY, groups);