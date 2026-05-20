import { SetMetadata } from '@nestjs/common';

export const REQUIRE_ALL_PERMISSIONS_KEY = 'requireAllPermissions';
export const RequireAllPermissions = (...keys: string[]) =>
  SetMetadata(REQUIRE_ALL_PERMISSIONS_KEY, keys);
