import { SetMetadata } from '@nestjs/common';

export const Groups = (...groups: string[]) => SetMetadata('groups', groups);