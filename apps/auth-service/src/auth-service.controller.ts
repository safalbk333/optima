import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { ClientTokenDto } from './dto/client-token.dto';
import { ClientCodeExchangeDto } from './dto/client-code-exchange.dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) { }

  @Get()
  getHello(): string {
    return this.authServiceService.getHello();
  }
  
  @MessagePattern('auth.check')
  healthCheck() {
    return this.authServiceService.getHello();
  }

  @MessagePattern({ cmd: 'get-client-token' })
  async getClientToken(
    @Payload() dto: ClientTokenDto,
  ) {
    return this.authServiceService.getClientToken(dto);
  }

  @MessagePattern({ cmd: 'exchange-code' })
  async exchangeCode(
    @Payload() dto: ClientCodeExchangeDto,
  ) {
    return this.authServiceService.exchangeCode(dto);
  }



}
