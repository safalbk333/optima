import { HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Agent } from 'https';
import { RpcException } from '@nestjs/microservices';
import { StringUtil } from './string.util';

export interface KeycloakConfig {
  realmName: string;
  keycloakUrl: string;
  authClientId: string;
  authClientSecret: string;
  clientId: string;
  clientSecret?: string;
  audience: string;
}

export class KeycloakUtil {
  private static logger = new Logger(KeycloakUtil.name);
  private static axiosInstance: AxiosInstance | null = null;

  static getConfig(origin: string, client: string): KeycloakConfig {
    const allowedClients = (process.env.ALLOWED_CLIENTS || '')
      .split(',')
      .map((client) => client.trim())
      .filter(Boolean);
    if (!allowedClients.includes(client)) {
      this.logger.error(
        `Invalid client: ${client}. Allowed clients: ${allowedClients.join(', ')}`,
      );
      throw new Error(`Invalid client: ${client}`);
    }

    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);
    if (
      origin &&
      allowedOrigins.length > 0 &&
      !allowedOrigins.includes(origin)
    ) {
      this.logger.error(
        `Invalid origin: ${origin}. Allowed origins: ${allowedOrigins.join(', ')}`,
      );
      throw new Error(`Invalid origin: ${origin}`);
    }

    this.logger.log(`Origin: ${origin ?? 'undefined'}, Client: ${client}`);

    const config: KeycloakConfig = {
      realmName: process.env.REALMNAME,
      keycloakUrl: process.env.KEYCLOAK_URL,
      authClientId: process.env.AUTH_CLIENT_ID,
      authClientSecret: process.env.AUTH_CLIENT_SECRET,
      clientId:process.env.HRMS_CLIENT,
      clientSecret: process.env.HRMS_CLIENT_SECRET,
      audience: process.env.AUDIENCE,
    };

    const missingVars = Object.entries(config)
      .filter(([key, value]) => !value && key !== 'clientSecret')
      .map(([key]) => key);
    if (missingVars.length > 0) {
      this.logger.error(
        `Missing environment variables for client ${client}: ${missingVars.join(', ')}`,
      );
      throw new Error(
        `Missing required environment variables for client ${client}: ${missingVars.join(', ')}`,
      );
    }

    return config;
  }

  public static getAxiosInstance(): AxiosInstance {
    const bypassSsl = process.env.BYPASS_SSL === 'true';
    return axios.create({
      httpsAgent: bypassSsl
        ? new Agent({ rejectUnauthorized: false })
        : undefined,
      timeout: 60000,
    });
  }

  static async validateCode(
    issuer: string,
    code: string,
    redirectUrl: string,
    clientId: string,
    state: string,
    clientSecret?: string,
  ) {

    
    const url = `${issuer}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUrl,
      state: state,
      code,
    });

    if (clientSecret) {
      data.append('client_secret', clientSecret);
    }

    this.logger.log(
      `Validating code with URL: ${url}, redirect_uri: ${redirectUrl}`,
    );

    if (!this.axiosInstance) {
      this.axiosInstance = this.getAxiosInstance();
    }

    try {
      const response = await this.axiosInstance.post(url, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data;
    } catch (error: any) {
      this.logger.error(
        'Token retrieval failed',
        JSON.stringify({
          error: error.response?.data || error.message,
          status: error.response?.status,
          url,
          params: data.toString(),
        }),
      );
      throw new Error(
        `Token retrieval failed: ${error.response?.data?.error_description || error.message}`,
      );
    }
  }

  static validateTokenResponse(data: any) {
    if (!data.access_token) {
      throw new Error('No access token in response');
    }
  }

  static validateUserInfoResponse(data: any) {
    if (!data.sub) {
      throw new Error('No user ID in userinfo response');
    }
  }

  static validateLogoutResponse(status: number) {
    if (status !== HttpStatus.NO_CONTENT) {
      throw new Error('Logout failed');
    }
  }

  static async getClientToken(config: KeycloakConfig): Promise<string> {
    const url = `${config.keycloakUrl}/realms/${config.realmName}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      client_id: config.authClientId,
      client_secret: config.authClientSecret,
      grant_type: 'client_credentials',
    });

    this.logger.log(`Token request URL: ${url}`);

    try {
      const response = await this.getAxiosInstance().post(url, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (response.data.access_token) {
        this.logger.log('Client token retrieved successfully');
        return response.data.access_token;
      } else {
        this.logger.error(
          'Failed to obtain client token: No access token in response',
        );
        throw new RpcException('Failed to obtain client token');
      }
    } catch (error: any) {
      this.logger.error(
        'Error retrieving client token',
        JSON.stringify({
          error: error.response?.data || error.message,
          status: error.response?.status,
          url,
        }),
      );
      throw new RpcException(`Failed to obtain client token: ${error.message}`);
    }
  }

  static async fetchUserRolesAndPermissions(
    clientToken: string,
    userId: string,
    config: KeycloakConfig,
    roleConfig: {
      jobRolePrefix: string;
      groupPrefix: string;
      permissionPrefix: string;
      fallbackRoleName: string;
    },
  ): Promise<
    {
      name: string;
      groupRoles: string[];
      rawGroupRoles: string[];
      permissions: string[];
    }[]
  > {
    const { jobRolePrefix, groupPrefix, permissionPrefix, fallbackRoleName } =
      roleConfig;
    const rolesUrl = `${config.keycloakUrl}/admin/realms/${config.realmName}/users/${userId}/role-mappings/realm/composite`;

    this.logger.log(`Roles request URL: ${rolesUrl}`);

    try {
      const rolesResponse = await this.getAxiosInstance().get(rolesUrl, {
        headers: { Authorization: `Bearer ${clientToken}` },
      });

      if (!rolesResponse.data || rolesResponse.data.length === 0) {
        this.logger.warn('No roles found for the user');
        // Return empty array instead of throwing for new users
        return [];
      }

      const directPermissions = rolesResponse.data
        .filter(
          (role: any) =>
            !role.composite &&
            StringUtil.hasPrefix(role.name, permissionPrefix),
        )
        .map((perm: any) => perm.name);

      const allPermissions: string[] = [...directPermissions];

      const desRoles = rolesResponse.data.filter((role: any) =>
        StringUtil.hasPrefix(role.name, jobRolePrefix),
      );

      const desRolePromises = desRoles.map(async (desRole: any) => {
        const compositesUrl = `${config.keycloakUrl}/admin/realms/${config.realmName}/roles/${encodeURIComponent(desRole.name)}/composites`;
        this.logger.log(`Fetching composites for role: ${desRole.name}`);

        const compositesResponse = await this.getAxiosInstance().get(
          compositesUrl,
          {
            headers: { Authorization: `Bearer ${clientToken}` },
          },
        );

        const groupRoles = compositesResponse.data
          .filter((comp: any) => StringUtil.hasPrefix(comp.name, groupPrefix))
          .map((grpRole: any) => grpRole.name);

        const desDirectPermissions = compositesResponse.data
          .filter(
            (comp: any) =>
              !comp.composite &&
              StringUtil.hasPrefix(comp.name, permissionPrefix),
          )
          .map((perm: any) => perm.name);

        allPermissions.push(...desDirectPermissions);

        const groupRolePermissionPromises = groupRoles.map(
          async (grpRoleName: string) => {
            const rolePermissionsUrl = `${config.keycloakUrl}/admin/realms/${config.realmName}/roles/${encodeURIComponent(grpRoleName)}/composites`;
            this.logger.log(
              `Fetching permissions for group role: ${grpRoleName}`,
            );

            const rolePermissionsResponse = await this.getAxiosInstance().get(
              rolePermissionsUrl,
              {
                headers: { Authorization: `Bearer ${clientToken}` },
              },
            );

            const permissions = rolePermissionsResponse.data
              .filter(
                (perm: any) =>
                  !perm.composite &&
                  StringUtil.hasPrefix(perm.name, permissionPrefix),
              )
              .map((perm: any) => perm.name);

            this.logger.log(
              `Fetched group role: ${grpRoleName} with permissions: ${permissions.join(', ')}`,
            );

            allPermissions.push(...permissions);
            return permissions;
          },
        );

        await Promise.all(groupRolePermissionPromises);

        return {
          name: desRole.name,
          groupRoles,
          rawGroupRoles: groupRoles,
          permissions: [],
        };
      });

      const structuredRoles = await Promise.all(desRolePromises);

      const uniquePermissions = [...new Set(allPermissions)];

      if (desRoles.length === 0 && directPermissions.length === 0) {
        this.logger.warn(
          'No job roles or direct permissions found for the user',
        );
        // Return empty array instead of throwing for new users
        return [];
      }

      if (desRoles.length > 0) {
        structuredRoles.forEach((role) => {
          role.permissions = uniquePermissions;
        });
      } else {
        structuredRoles.push({
          name: fallbackRoleName,
          groupRoles: [],
          rawGroupRoles: [],
          permissions: uniquePermissions,
        });
      }

      return structuredRoles;
    } catch (error: any) {
      this.logger.error(
        'Error fetching user roles and permissions',
        JSON.stringify({
          error: error.response?.data || error.message,
          status: error.response?.status,
          url: rolesUrl,
        }),
      );
      throw new RpcException(`Failed to fetch user roles: ${error.message}`);
    }
  }
}
