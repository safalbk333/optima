import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'apps/api-gateway/src/modules/auth/auth.service';
import { ClientTokenDto } from './dto/client-token.dto';
import { KeycloakUtil } from './util/keycloak.util';
import { formatResponse } from './common/response/format-response';
import { ResponseOptions } from './common/response/response.interface';
import { RpcException } from '@nestjs/microservices';
import { AppLogger } from './common/logger/app.logger';

@Injectable()
export class AuthServiceService {
    private readonly logger =
    new AppLogger(AuthService.name);
  getHello(): string {
    return 'Hello World!';
  }

  async getClientToken(dto: ClientTokenDto) {
    try {
      const { clientId, clientSecret } = dto;

      const realmName =
        process.env.REALMNAME;

      const keycloakUrl =
        process.env.KEYCLOAK_URL;

      if (!realmName || !keycloakUrl) {
        throw new Error(
          'Missing required environment variables for Keycloak configuration',
        );
      }

      const url =
        `${keycloakUrl}/realms/${realmName}/protocol/openid-connect/token`;

      const data =
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        });

      this.logger.log(
        `Generating client token for client: ${clientId}`,
      );

      const response =
        await KeycloakUtil.getAxiosInstance().post(
          url,
          data.toString(),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded',
            },
          },
        );

      if (!response.data.access_token) {
        throw new Error(
          'No access token in response',
        );
      }

      this.logger.log(
        'Client token generated successfully',
      );

      return formatResponse({
        data: response.data,
        message:
          'Client token generated successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<any>);
    } catch (error: any) {
      this.logger.error(
        `Error generating client token: ${error.message}`,
      );

      throw new RpcException(
        `Failed to generate client token: ${error.message}`,
      );
    }
  }
}
