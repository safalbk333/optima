import { HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Agent } from 'https';
import { RpcException } from '@nestjs/microservices';

export interface KeycloakConfig {
  realmName: string;
  keycloakUrl: string;
  authClientId: string;
  authClientSecret: string;
  clientId: string;
  clientSecret?: string;
  audience: string;
}

export class PermissionUtil {
  private static logger = new Logger(PermissionUtil.name);
  private static axiosInstance: AxiosInstance | null = null;


  
  public static getAxiosInstance(): AxiosInstance {
    const bypassSsl = process.env.BYPASS_SSL === 'true';
    return axios.create({
      httpsAgent: bypassSsl
        ? new Agent({ rejectUnauthorized: false })
        : undefined,
      timeout: 60000,
    });
  }
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


static async createPermission(
  config: KeycloakConfig,
  roleName: string,
  roleDescription:string,
  clientRole:boolean
): Promise<void> {
  const token = await this.getClientToken(config);

  const url = `${config.keycloakUrl}/admin/realms/${config.realmName}/roles`;
  try {
    const response = await this.getAxiosInstance().post(
      url,
      {
        name: roleName,
        description: roleDescription,
        clientRole:clientRole
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    this.logger.log(
      `Role ${roleName} created successfully. Status: ${response.status}`,
    );
  } catch (error: any) {
    this.logger.error(
      'Failed to create role',
      JSON.stringify({
        status: error.response?.status,
        data: error.response?.data,
      }),
    );

    throw new RpcException(
      error.response?.data || 'Failed to create role',
    );
  }
}
}
