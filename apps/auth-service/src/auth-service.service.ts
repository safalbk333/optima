import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'apps/api-gateway/src/modules/auth-service/auth/auth.service';
import { ClientTokenDto } from './dto/client-token.dto';
import { KeycloakUtil } from './util/keycloak.util';
import { formatResponse } from './common/response/format-response';
import { ResponseOptions } from './common/response/response.interface';
import { RpcException } from '@nestjs/microservices';
import { AppLogger } from './common/logger/app.logger';
import axios from 'axios';
import { ClientCodeExchangeDto } from './dto/client-code-exchange.dto';

@Injectable()
export class AuthServiceService {
  private readonly logger =
    new AppLogger(AuthService.name);
  getHello(): string {
    return 'Hello World!';
  }

}
