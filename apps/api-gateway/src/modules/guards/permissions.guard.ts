import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getAxiosInstance } from '../common/utils/axios.helper';
import { PERMISSIONS_KEY } from './decorators/permissions.decorator';
import { REQUIRE_ALL_PERMISSIONS_KEY } from './decorators/require-all-permissions.decorator';
import { PUBLIC_KEY } from './decorators/public.decorator';
import { AxiosError } from 'axios';

// Custom JWT payload interface
interface CustomJwtPayload {
  sub?: string; // Subject (user or client ID, service account user ID for clients)
  azp?: string; // Authorized party (client_id for client tokens)
  client_id?: string; // Alternative client_id field
  realm?: string; // Realm name
  exp?: number; // Expiration time
  email?: string; // User-specific claim
  name?: string; // User-specific claim
  [key: string]: any; // Allow additional fields
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);
  private readonly axiosInstance = getAxiosInstance();

  constructor(private readonly reflector: Reflector) {}




  
  async canActivate(context: ExecutionContext): Promise<boolean> {

    
    this.logger.debug( `Checking dev mode ${process.env.DEV_MODE}`);
  

    const isDevMode = process.env.DEV_MODE?.toLowerCase() === 'true';
    if (isDevMode) {
      return true;
    }
    // Check if endpoint is marked as public
    const isPublic =
      this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(PUBLIC_KEY, context.getClass());

    // Get permissions requiring ANY match (OR logic)
    const orPermissions: string[] =
      this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler()) ||
      this.reflector.get<string[]>(PERMISSIONS_KEY, context.getClass()) ||
      [];

    // Get permissions requiring ALL matches (AND logic)
    const andPermissions: string[] =
      this.reflector.get<string[]>(
        REQUIRE_ALL_PERMISSIONS_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<string[]>(
        REQUIRE_ALL_PERMISSIONS_KEY,
        context.getClass(),
      ) ||
      [];

    // If endpoint is public, skip permission checks
    if (isPublic) return true;

    // If no permissions are required, deny access by default
    if (orPermissions.length === 0 && andPermissions.length === 0) {
      this.logger.warn('No permissions specified for this endpoint.');
      throw new ForbiddenException('Access denied: No permissions specified');
    }

    // Prevent mixing of @Permissions and @RequireAllPermissions
    if (orPermissions.length > 0 && andPermissions.length > 0) {
      this.logger.error(
        'Cannot use both @Permissions and @RequireAllPermissions on the same endpoint',
      );
      throw new ForbiddenException(
        'Invalid permission configuration: Cannot combine OR and AND logic',
      );
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { payload: CustomJwtPayload };

    if (!user?.payload) {
      this.logger.warn('Invalid token or user not authenticated');
      throw new UnauthorizedException(
        'Invalid token or user not authenticated',
      );
    }

    const payload = user.payload;
    const realmName =  process.env.REALMNAME;
    if (!realmName) {
      this.logger.error('Realm name is missing and not set in environment');
      throw new UnauthorizedException('Realm configuration error');
    }

    let permissions: string[];

    try {
      if (payload.sub && (payload.email || payload.name)) {
        // User token
        permissions = await this.getUserPermissions(payload.sub, realmName);
      } else {
        // Client token
        const clientId = payload.azp || payload.client_id || payload.sub;
        if (!clientId) {
          this.logger.warn('Invalid client token: missing client_id or azp');
          throw new UnauthorizedException('Invalid client token');
        }
        permissions = await this.getClientPermissions(
          clientId,
          payload.sub,
          realmName,
        ); // Pass sub as serviceAccountUserId
      }

      const permissionsSet = new Set(permissions.map((p) => p.toLowerCase()));

      if (andPermissions.length > 0) {
        const missingPermissions = andPermissions.filter(
          (perm) => !permissionsSet.has(perm.toLowerCase()),
        );
        const clientIdForLog = payload.azp || payload.client_id || payload.sub;
        if (missingPermissions.length > 0) {
          this.logger.warn(
            `User ${payload.sub || clientIdForLog} lacks required permissions: ${missingPermissions}`,
          );
          throw new ForbiddenException(
            `Access denied: Missing permissions - ${missingPermissions.join(', ')}`,
          );
        }
      }

      // Handle OR logic (@Permissions)
      if (orPermissions.length > 0) {
        const hasAnyPermission = orPermissions.some((perm) =>
          permissionsSet.has(perm.toLowerCase()),
        );
        const clientIdForLog = payload.azp || payload.client_id || payload.sub;
        if (!hasAnyPermission) {
          this.logger.warn(
            `User ${payload.sub || clientIdForLog} lacks any of the required permissions: ${orPermissions}`,
          );
          throw new ForbiddenException(
            `Access denied: Missing required permissions - ${orPermissions.join(', ')}`,
          );
        }
      }

      return true;
    } catch (error) {
      this.logger.error('Failed to validate permissions', error);
      throw new ForbiddenException(
        error instanceof Error ? error.message : 'Permission check failed',
      );
    }
  }

  private async getUserPermissions(
    userId: string,
    realmName: string,
  ): Promise<string[]> {
    const token = await this.getAuthToken();
    const url = `${process.env.KEYCLOAK_URL}/admin/realms/${realmName}/users/${userId}/role-mappings/realm/composite`;

    try {
      const response = await this.axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data
        .filter(
          (role) =>
            !role.composite && role.name && typeof role.name === 'string',
        )
        .map((role) => role.name);
    } catch (error) {
      let errorMessage = 'Unknown error';
      let errorData: unknown = null;

      if (error instanceof AxiosError && error.response) {
        errorMessage = error.message || 'Axios error';
        errorData = error.response.data;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.logger.error(
        `Error fetching user permissions from Keycloak for user ${userId}`,
        { errorMessage, errorData },
      );
      throw new ForbiddenException('Error fetching permissions from Keycloak');
    }
  }

  private async getClientPermissions(
    clientId: string,
    serviceAccountUserId: string,
    realmName: string,
  ): Promise<string[]> {
    const token = await this.getAuthToken();
    const url = `${process.env.KEYCLOAK_URL}/admin/realms/${realmName}/clients?clientId=${clientId}`;

    try {
      const response = await this.axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clients = response.data; // Array of clients
      const client = clients.find((c) => c.clientId === clientId);
      if (!client) throw new Error('Client not found');

      if (!serviceAccountUserId) {
        this.logger.error(
          'Service account user ID is missing from token payload',
        );
        throw new Error(
          'Invalid client token: missing service account user ID',
        );
      }

      const roleMappingsUrl = `${process.env.KEYCLOAK_URL}/admin/realms/${realmName}/users/${serviceAccountUserId}/role-mappings/realm/composite`;
      this.logger.debug(`Role mappings URL: ${roleMappingsUrl}`);

      const roleResponse = await this.axiosInstance.get(roleMappingsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return roleResponse.data
        .filter(
          (role) =>
            !role.composite && role.name && typeof role.name === 'string',
        )
        .map((role) => role.name);
    } catch (error) {
      let errorMessage = 'Unknown error';
      let errorData: unknown = null;

      if (error instanceof AxiosError && error.response) {
        errorMessage = error.message || 'Axios error';
        errorData = error.response.data;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.logger.error(`Error fetching client permissions for ${clientId}`, {
        errorMessage,
        errorData,
      });
      throw new ForbiddenException('Error fetching client permissions');
    }
  }

  private async getAuthToken(): Promise<string> {
    const keycloakTokenUrl = `${process.env.KEYCLOAK_URL}/realms/${process.env.REALMNAME}/protocol/openid-connect/token`;

    try {
      const response = await this.axiosInstance.post(
        keycloakTokenUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.AUTH_CLIENT_ID,
          client_secret: process.env.AUTH_CLIENT_SECRET,
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      return response.data.access_token;
    } catch (error) {
      let errorMessage = 'Unknown error';
      let errorData: unknown = null;

      if (error instanceof AxiosError && error.response) {
        errorMessage = error.message || 'Axios error';
        errorData = error.response.data;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      this.logger.error('Failed to get Keycloak authentication token', {
        errorMessage,
        errorData,
      });
      throw new UnauthorizedException('Keycloak authentication failed');
    }
  }
}
