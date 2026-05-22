import {
  Injectable,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { KeycloakUtil } from './util/keycloak.util';
import {
  AuthDto,
  RefreshTokenDto,
  ChangePasswordDto,
  ClientTokenDto,
  GetClientAttributesDto,
  UpdateClientAttributesDto,
} from './dto/auth.dto';
import { formatResponse, ResponseOptions } from '../common/response.helper';
import { AppLogger } from '../common/logger/app.logger';
import { RpcException } from '@nestjs/microservices';
import { StringUtil } from './util/string.util';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for the expected response from findEmpById
interface FindEmpByIdResponse {
  success: boolean;
  message: string;
  data: {
    employeeCode: string;
    [key: string]: any; // Allow other fields
  };
}

@Injectable()
export class KeycloakService {
  private readonly logger = new AppLogger(KeycloakService.name);

  private readonly roleConfig = {
    jobRolePrefix: 'job_',
    groupPrefix: 'grp_',
    permissionPrefix: 'prv_',
    fallbackRoleName: 'no_jobRole_permissions',
  };

  constructor(
    // @Inject('MASTER_SERVICE') private readonly masterClient: ClientProxy,
  ) {}

  private getForwardedHeaders() {
    const externalUrl =
      process.env.KEYCLOAK_URL_EXTERNAL || process.env.KEYCLOAK_URL;
    if (!externalUrl) return {};

    try {
      const url = new URL(externalUrl);
      return {
        Host: url.host,
        'X-Forwarded-Proto': url.protocol.replace(':', ''), // 'https' or 'http'
        'X-Forwarded-Host': url.host,
        'X-Forwarded-Port':
          url.port || (url.protocol === 'https:' ? '443' : '80'),
      };
    } catch {
      this.logger.warn(
        'Invalid KEYCLOAK_URL_EXTERNAL, skipping forwarded headers',
      );
      return {};
    }
  }

  async auth(dto: AuthDto) {
    this.logger.log(
      `=== AUTHENTICATION FLOW STARTED === | origin: ${dto.origin} | client: ${dto.client} | hasCode: ${!!dto.code} | redirectUrl: ${dto.redirectUrl}`,
    );

    let userId: string | undefined;
    let email: string | undefined;
    let fullUserToken: any;
    let config: ReturnType<typeof KeycloakUtil.getConfig>;

    try {
      
      this.logger.log(
        `Authenticating user (frontend sent iss: ${dto.iss}) with client: ${dto.client}`,
      );

      config = KeycloakUtil.getConfig(dto.origin, dto.client);

      this.logger.log(
        `Resolved config → realm: ${config.realmName} | clientId: ${config.clientId} | audience: ${config.audience} | hasSecret: ${!!config.clientSecret}`,
      );

      const trustedIssuer = `${process.env.KEYCLOAK_URL}/realms/${process.env.REALMNAME}`;

      this.logger.log(`Trusted issuer: ${trustedIssuer}`);
      this.logger.log(`Redirect URL: ${dto.redirectUrl}`);
      this.logger.log(`Code: ${dto.code}`);
      // Step 1: Code exchange
      const output = await KeycloakUtil.validateCode(
        trustedIssuer,
        dto.code,
        dto.redirectUrl,
        config.clientId,
        dto.state,
        config.clientSecret,
      );

      KeycloakUtil.validateTokenResponse(output);
      const partialToken = output.access_token;

      // Step 2: UMA ticket exchange
      const tokenUrl = `${trustedIssuer}/protocol/openid-connect/token`;
      const params = new URLSearchParams({
        audience: config.audience,
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      });

      const tokenResponse = await KeycloakUtil.getAxiosInstance().post(
        tokenUrl,
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${partialToken}`,
            ...this.getForwardedHeaders(),
          },
          timeout: 15000,
        },
      );

      KeycloakUtil.validateTokenResponse(tokenResponse.data);
      fullUserToken = tokenResponse.data;

      // Step 3: Userinfo
      const userInfoUrl = `${trustedIssuer}/protocol/openid-connect/userinfo`;
      const userInfoResponse = await KeycloakUtil.getAxiosInstance().get(
        userInfoUrl,
        {
          headers: {
            Authorization: `Bearer ${partialToken}`,
            ...this.getForwardedHeaders(),
          },
        },
      );

      KeycloakUtil.validateUserInfoResponse(userInfoResponse.data);
      userId = userInfoResponse.data.sub;
      email = userInfoResponse.data.email?.toLowerCase();

      // Sync (soft fail)
      // try {
      //   await lastValueFrom(
      //     this.masterClient.send('master-service.user-management.user.sync', {
      //       keycloakUserId: userId,
      //       email,
      //     }),
      //   );
      // } catch (syncError: any) {
      //   this.logger.error(
      //     `User sync failed for ${email || 'unknown'}: ${syncError.message}`,
      //   );
      // }

      // Get preferred_username from userinfo (always present in OpenID scope)
      const preferredUsername = userInfoResponse.data.preferred_username;

      // Strategy: prefer username if it looks like an employee code
      let employeeCode: string | undefined;

      if (preferredUsername) {
        // Heuristic: if it does NOT look like an email → treat as employeeCode
        if (
          !preferredUsername.includes('@') &&
          preferredUsername.trim().length > 0
        ) {
          employeeCode = preferredUsername.trim();
          this.logger.log(
            `Using preferred_username as employeeCode: ${employeeCode} (user ${userId})`,
          );
        } else {
          this.logger.log(
            `preferred_username looks like email (${preferredUsername}), will query DB instead (user ${userId})`,
          );
        }
      } else {
        this.logger.warn(
          `No preferred_username found in userinfo for ${userId}`,
        );
      }

      // Final fallback to database if we still don't have a good employeeCode
      // if (!employeeCode) {
      //   this.logger.warn(
      //     `Falling back to master-service DB call to find employeeCode (user ${userId})`,
      //   );

        // const userResponse = (await lastValueFrom(
        //   this.masterClient
        //     .send('master-service.user-management.user.findEmpById', userId)
        //     .pipe(
        //       catchError((err: any) => {
        //         const errMsg = err.message;
        //         const errCode = err.code;
        //         const errStatus = err.status || err.response?.status;

        //         this.logger.error(
        //           `Master service call failed for findEmpById (userId: ${userId}): ${errMsg}`,
        //           err,
        //         );

        //         if (
        //           err instanceof NotFoundException ||
        //           errStatus === HttpStatus.NOT_FOUND ||
        //           err?.response?.status === HttpStatus.NOT_FOUND
        //         ) {
        //           throw new NotFoundException(
        //             `User with ID ${userId} not found in the system. Please contact the administrator.`,
        //           );
        //         }

        //         if (
        //           errCode === 'ECONNREFUSED' ||
        //           errCode === 'ETIMEDOUT' ||
        //           errCode === 'ECONNRESET' ||
        //           errStatus === HttpStatus.SERVICE_UNAVAILABLE ||
        //           errMsg.includes('connect') ||
        //           errMsg.includes('timeout')
        //         ) {
        //           throw new RpcException({
        //             status: HttpStatus.SERVICE_UNAVAILABLE,
        //             message:
        //               'Our internal services are temporarily unavailable. Please try again in a moment or contact support.',
        //           });
        //         }

        //         throw new RpcException({
        //           status: HttpStatus.INTERNAL_SERVER_ERROR,
        //           message:
        //             'An unexpected error occurred during authentication. Our team has been notified.',
        //         });
        //       }),
        //     ),
        // )) as FindEmpByIdResponse;

      //   employeeCode = userResponse?.data?.employeeCode;

      //   if (employeeCode) {
      //     this.logger.log(
      //       `DB returned employeeCode: ${employeeCode} for user ${userId}`,
      //     );
      //   }
      // }

      // Final safety check
      // if (!employeeCode) {
      //   throw new NotFoundException(
      //     `Employee code not found for user ID ${userId}. Please contact the administrator.`,
      //   );
      // }

      const clientToken = await KeycloakUtil.getClientToken(config);

      const rolesAndPermissions =
        await KeycloakUtil.fetchUserRolesAndPermissions(
          clientToken,
          userId!,
          config,
          this.roleConfig,
        );

      const transformedRolesAndPermissions = rolesAndPermissions.map(
        (role) => ({
          name: StringUtil.formatRole(
            role.name,
            this.roleConfig.jobRolePrefix,
            this.roleConfig.fallbackRoleName,
          ),
          groupRoles: role.groupRoles.map((groupRole) =>
            StringUtil.formatRole(groupRole, this.roleConfig.groupPrefix),
          ),
          rawGroupRoles: role.groupRoles,
          permissions: role.permissions,
        }),
      );

      return formatResponse({
        data: {
          token: fullUserToken,
          employeeCode: "123",
          rolesAndPermissions: transformedRolesAndPermissions,
        },
        message: 'Authentication successful',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<{
        token: any;
        employeeCode: string;
        rolesAndPermissions: any;
      }>);
    } catch (error: any) {
      const errMsg = error.message;
      const errStatus =
        error.status ||
        error.response?.status ||
        HttpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error(
        `=== AUTHENTICATION FLOW FAILED === | message: ${errMsg} | status: ${errStatus}`,
        error,
      );

      if (error instanceof RpcException || error instanceof NotFoundException) {
        throw error;
      }

      throw new RpcException({
        status: errStatus,
        message: errMsg || 'Authentication failed. Please try again.',
      });
    }
  }

  async changePassword(dto: ChangePasswordDto) {
    this.logger.log('Generating password change URL');
    try {
      const config = KeycloakUtil.getConfig(dto.origin, dto.client || 'client');
      if (!dto.redirectUri) {
        throw new RpcException('Missing redirect URI');
      }
      const url = `${process.env.KEYCLOAK_URL_EXTERNAL}/realms/${config.realmName}/protocol/openid-connect/auth?client_id=${config.clientId}&redirect_uri=${dto.redirectUri}/pass_update&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD&acr=urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport&prompt=login`;
      this.logger.log('Password change URL generated successfully');
      return formatResponse({
        data: { url },
        message: 'Password change URL generated successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<{ url: string }>);
    } catch (error: any) {
      this.logger.error(
        `Error processing change password: ${error.message}`,
        error,
      );
      throw new RpcException(
        `Failed to generate password change URL: ${error.message}`,
      );
    }
  }

  async signOut(dto: RefreshTokenDto) {
    this.logger.log('Processing sign-out request');
    try {
      const config = KeycloakUtil.getConfig(undefined, dto.client);
      const url = `${config.keycloakUrl}/realms/${config.realmName}/protocol/openid-connect/logout`;
      const data = new URLSearchParams({
        client_id: config.clientId,
        refresh_token: dto.refreshToken,
      });
      if (config.clientSecret) {
        data.append('client_secret', config.clientSecret);
      }
      const result = await KeycloakUtil.getAxiosInstance().post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...this.getForwardedHeaders(),
        },
      });

      KeycloakUtil.validateLogoutResponse(result.status);
      this.logger.log('User logged out successfully');
      return formatResponse({
        data: null,
        message: 'Logout successful!',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<null>);
    } catch (error: any) {
      this.logger.error(`Error processing signout: ${error.message}`, error);
      throw new RpcException(`Sign-out failed: ${error.message}`);
    }
  }

  async refreshAccessToken(dto: RefreshTokenDto) {
    this.logger.log('Refreshing access token');
    try {
      const config = KeycloakUtil.getConfig(undefined, dto.client);
      const url = `${config.keycloakUrl}/realms/${config.realmName}/protocol/openid-connect/token`;
      const data = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: config.clientId,
        refresh_token: dto.refreshToken,
      });
      if (config.clientSecret) {
        data.append('client_secret', config.clientSecret);
      }

      const partialTokenResponse = await KeycloakUtil.getAxiosInstance().post(
        url,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...this.getForwardedHeaders(),
          },
        },
      );

      KeycloakUtil.validateTokenResponse(partialTokenResponse.data);

      const tokenUrl = `${config.keycloakUrl}/realms/${config.realmName}/protocol/openid-connect/token`;
      const tokenData = new URLSearchParams({
        audience: config.audience,
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      });

      const result = await KeycloakUtil.getAxiosInstance().post(
        tokenUrl,
        tokenData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${partialTokenResponse.data.access_token}`,
            ...this.getForwardedHeaders(),
          },
        },
      );

      KeycloakUtil.validateTokenResponse(result.data);
      this.logger.log('Token refresh successful');
      return formatResponse({
        data: result.data,
        message: 'Token refresh successful',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<any>);
    } catch (error: any) {
      this.logger.error(
        `Error processing token refresh: ${error.message}`,
        error,
      );
      throw new RpcException(`Token refresh failed: ${error.message}`);
    }
  }

  async getClientToken(dto: ClientTokenDto) {
    try {
      const { clientId, clientSecret } = dto;
      const realmName = process.env.REALMNAME;
      const keycloakUrl = process.env.KEYCLOAK_URL;

      if (!realmName || !keycloakUrl) {
        throw new Error(
          'Missing required environment variables for Keycloak configuration',
        );
      }

      const url = `${keycloakUrl}/realms/${realmName}/protocol/openid-connect/token`;
      const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      });

      this.logger.log(`Generating client token for client: ${clientId}`);

      const response = await KeycloakUtil.getAxiosInstance().post(
        url,
        data.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...this.getForwardedHeaders(),
          },
        },
      );

      if (!response.data.access_token) {
        throw new Error('No access token in response');
      }

      this.logger.log('Client token generated successfully');
      return formatResponse({
        data: response.data,
        message: 'Client token generated successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<any>);
    } catch (error: any) {
      this.logger.error(
        `Error generating client token: ${error.message}`,
        error,
      );
      throw new RpcException(
        `Failed to generate client token: ${error.message}`,
      );
    }
  }

  async getClientAttributes(dto: GetClientAttributesDto) {
    try {
      const { clientId } = dto;
      // Use a fixed config (e.g., for 'client' since no origin is provided)
      const config = KeycloakUtil.getConfig(undefined, 'client');
      const realmName = config.realmName;
      const keycloakUrl = config.keycloakUrl;
      const token = await KeycloakUtil.getClientToken(config);
      const url = `${keycloakUrl}/admin/realms/${realmName}/clients?clientId=${clientId}`;
      this.logger.log(`Fetching client attributes for clientId: ${clientId}`);
      const response = await KeycloakUtil.getAxiosInstance().get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.length === 0) {
        this.logger.error(`Client not found for clientId: ${clientId}`);
        throw new NotFoundException(
          `Client not found for clientId: ${clientId}`,
        );
      }
      const attributes = response.data[0].attributes || {};
      this.logger.log('Client attributes retrieved successfully');
      return formatResponse({
        data: attributes,
        message: 'Client attributes retrieved successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<Record<string, string>>);
    } catch (error: any) {
      this.logger.error(
        'Error retrieving client attributes',
        JSON.stringify({
          error: error.response?.data || error.message,
          status: error.response?.status,
        }),
      );
      throw new RpcException(
        `Failed to retrieve client attributes: ${error.message}`,
      );
    }
  }

  async updateClientAttributes(dto: UpdateClientAttributesDto) {
    try {
      const { clientId, attributes } = dto;
      // Use a fixed config (e.g., for 'client' since no origin is provided)
      const config = KeycloakUtil.getConfig(undefined, 'client');
      const realmName = config.realmName;
      const keycloakUrl = config.keycloakUrl;
      const token = await KeycloakUtil.getClientToken(config);
      const findUrl = `${keycloakUrl}/admin/realms/${realmName}/clients?clientId=${clientId}`;
      this.logger.log(`Finding client ID for clientId: ${clientId}`);
      const findResponse = await KeycloakUtil.getAxiosInstance().get(findUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (findResponse.data.length === 0) {
        this.logger.error(`Client not found for clientId: ${clientId}`);
        throw new NotFoundException(
          `Client not found for clientId: ${clientId}`,
        );
      }
      const clientUuid = findResponse.data[0].id;
      const updateUrl = `${keycloakUrl}/admin/realms/${realmName}/clients/${clientUuid}`;
      this.logger.log(`Updating attributes for client UUID: ${clientUuid}`);
      await KeycloakUtil.getAxiosInstance().put(
        updateUrl,
        { attributes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      this.logger.log('Client attributes updated successfully');
      return formatResponse({
        data: null,
        message: 'Client attributes updated successfully',
        statusCode: HttpStatus.CREATED,
      } as ResponseOptions<null>);
    } catch (error: any) {
      this.logger.error(
        'Error updating client attributes',
        JSON.stringify({
          error: error.response?.data || error.message,
          status: error.response?.status,
        }),
      );
      throw new RpcException(
        `Failed to update client attributes: ${error.message}`,
      );
    }
  }
}
