import { Inject, Logger, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CURRENCY_PATTERN } from './currency.pattern';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';

@Injectable()
export class CurrencyGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(CurrencyGatewayService.name);
  }

  async create(data: CreateCurrencyDto) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.CREATE, data),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.FIND_ALL, {}),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.FIND_ONE, { id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, data: UpdateCurrencyDto) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.UPDATE, { id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
