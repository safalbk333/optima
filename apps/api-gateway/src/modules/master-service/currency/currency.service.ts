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

  async create(strSchemaId: string, data: CreateCurrencyDto) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.CREATE, { schemaId: strSchemaId, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(strSchemaId: string) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.FIND_ALL, { schemaId: strSchemaId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(strSchemaId: string, id: string) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.FIND_ONE, { schemaId: strSchemaId, id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(strSchemaId: string, id: string, data: UpdateCurrencyDto) {
    try {
      return await firstValueFrom(
        this.client.send(CURRENCY_PATTERN.UPDATE, { schemaId: strSchemaId, id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
