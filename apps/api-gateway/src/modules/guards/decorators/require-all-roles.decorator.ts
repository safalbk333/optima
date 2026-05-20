import { SetMetadata } from '@nestjs/common';

export const REQUIRE_ALL_ROLES_KEY = 'requireAllRoles';
export const RequireAllRoles = (...keys: string[]) =>
  SetMetadata(REQUIRE_ALL_ROLES_KEY, keys);
