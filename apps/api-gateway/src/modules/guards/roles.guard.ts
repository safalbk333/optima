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
import { ROLES_KEY } from './decorators/roles.decorator';
import { REQUIRE_ALL_ROLES_KEY } from './decorators/require-all-roles.decorator';
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
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  private readonly axiosInstance = getAxiosInstance();

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (process.env.DEV_MODE) return true;
    // Check if endpoint is marked as public
    const isPublic =
      this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(PUBLIC_KEY, context.getClass());

    // Get roles requiring ANY match (OR logic)
    const orRoles: string[] =
      this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) ||
      this.reflector.get<string[]>(ROLES_KEY, context.getClass()) ||
      [];

    // Get roles requiring ALL matches (AND logic)
    const andRoles: string[] =
      this.reflector.get<string[]>(
        REQUIRE_ALL_ROLES_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<string[]>(REQUIRE_ALL_ROLES_KEY, context.getClass()) ||
      [];

    // If endpoint is public, skip permission checks
    if (isPublic) return true;

    if (orRoles.length === 0 && andRoles.length === 0) {
      this.logger.warn('No roles specified for this endpoint.');
      throw new ForbiddenException('Access denied: No roles specified');
    }

    // Prevent mixing of @Roles and @RequireAllRoles
    if (orRoles.length > 0 && andRoles.length > 0) {
      this.logger.error(
        'Cannot use both @Roles and @RequireAllRoles on the same endpoint',
      );
      throw new ForbiddenException(
        'Invalid role configuration: Cannot combine OR and AND logic',
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
    this.logger.debug('Token payload:', payload);
    const realmName = payload.realm || process.env.REALMNAME;
    if (!realmName) {
      this.logger.error('Realm name is missing and not set in environment');
      throw new UnauthorizedException('Realm configuration error');
    }

    let roles: string[];

    try {
      if (payload.sub && (payload.email || payload.name)) {
        // User token
        roles = await this.getUserRoles(payload.sub, realmName);
      } else {
        // Client token
        const clientId = payload.azp || payload.client_id || payload.sub;
        if (!clientId) {
          this.logger.warn('Invalid client token: missing client_id or azp');
          throw new UnauthorizedException('Invalid client token');
        }
        this.logger.debug(`Fetching roles for clientId: ${clientId}`);
        roles = await this.getClientRoles(clientId, payload.sub, realmName); // Pass sub as serviceAccountUserId
      }

      const rolesSet = new Set(roles.map((r) => r.toLowerCase()));

      // Handle AND logic (@RequireAllRoles)
      if (andRoles.length > 0) {
        const missingRoles = andRoles.filter(
          (role) => !rolesSet.has(role.toLowerCase()),
        );
        const clientIdForLog = payload.azp || payload.client_id || payload.sub;
        if (missingRoles.length > 0) {
          this.logger.warn(
            `User ${payload.sub || clientIdForLog} lacks required roles: ${missingRoles}`,
          );
          throw new ForbiddenException(
            `Access denied: Missing roles - ${missingRoles.join(', ')}`,
          );
        }
      }

      // Handle OR logic (@Roles)
      if (orRoles.length > 0) {
        const hasAnyRole = orRoles.some((role) =>
          rolesSet.has(role.toLowerCase()),
        );
        const clientIdForLog = payload.azp || payload.client_id || payload.sub;
        if (!hasAnyRole) {
          this.logger.warn(
            `User ${payload.sub || clientIdForLog} lacks any of the required roles: ${orRoles}`,
          );
          throw new ForbiddenException(
            `Access denied: Missing required roles - ${orRoles.join(', ')}`,
          );
        }
      }

      return true;
    } catch (error) {
      this.logger.error('Failed to validate roles', error);
      throw new ForbiddenException(
        error instanceof Error ? error.message : 'Role check failed',
      );
    }
  }

  private async getUserRoles(
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
            role.name &&
            typeof role.name === 'string' &&
            role.name.toLowerCase().startsWith('grp_'),
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
        `Error fetching user roles from Keycloak for user ${userId}`,
        { errorMessage, errorData },
      );
      throw new ForbiddenException('Error fetching roles from Keycloak');
    }
  }

  private async getClientRoles(
    clientId: string,
    serviceAccountUserId: string,
    realmName: string,
  ): Promise<string[]> {
    const token = await this.getAuthToken();
    const url = `${process.env.KEYCLOAK_URL}/admin/realms/${realmName}/clients?clientId=${clientId}`;
    this.logger.debug(`Client roles URL: ${url}`);

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
            role.name &&
            typeof role.name === 'string' &&
            role.name.toLowerCase().startsWith('grp_'),
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

      this.logger.error(`Error fetching client roles for ${clientId}`, {
        errorMessage,
        errorData,
      });
      throw new ForbiddenException('Error fetching client roles');
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
