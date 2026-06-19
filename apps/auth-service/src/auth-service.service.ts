import { HttpStatus, Injectable } from '@nestjs/common';
import { ClientTokenDto } from './dto/client-token.dto';
import { formatResponse } from './common/response/format-response';
import { ResponseOptions } from './common/response/response.interface';
import { RpcException } from '@nestjs/microservices';
import { AppLogger } from './common/logger/app.logger';
import axios from 'axios';
import { ClientCodeExchangeDto } from './dto/client-code-exchange.dto';

@Injectable()
export class AuthServiceService {
  
  private readonly logger = new AppLogger(AuthServiceService.name);

  getHello(): string {
    return 'Hello World!';
  }

}
