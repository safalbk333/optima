import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { ClientTokenDto } from './dto/client-token.dto';
import { ClientCodeExchangeDto } from './dto/client-code-exchange.dto';

@Injectable()
export class AuthService {

  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) { }

  async findAll() {
    return await firstValueFrom(
      this.authClient.send(
        'auth.check',
        {},
      ),
    );
  }

  async getClientToken(dto: ClientTokenDto) {
    return firstValueFrom(
      this.authClient.send(
        { cmd: 'get-client-token' },
        dto,
      ),
    );
  }

  async exchangeCode(dto: ClientCodeExchangeDto) {
    return firstValueFrom(
      this.authClient.send(
        { cmd: 'exchange-code' },
        dto,
      ),
    );
  }


}
