import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...keys: string[]) => SetMetadata(ROLES_KEY, keys);
