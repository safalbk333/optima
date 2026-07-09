import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COUNTRY_PATTERN } from './country.pattern';
import { CreateCountryDto, UpdateCountryDto } from './dto/country.dto';

@Injectable()
export class CountryGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(CountryGatewayService.name);
  }

  async create(strSchemaId: string, data: CreateCountryDto) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.CREATE, { schemaId: strSchemaId, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.FIND_ALL, { schemaId: strSchemaId, ...payload }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(strSchemaId: string, id: string) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.FIND_ONE, { schemaId: strSchemaId, id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(strSchemaId: string, id: string, data: UpdateCountryDto) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.UPDATE, { schemaId: strSchemaId, id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
