import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CITY_PATTERN } from './city.pattern';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';

@Injectable()
export class CityGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(CityGatewayService.name);
  }

  async create(strSchemaId: string, data: CreateCityDto) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.CREATE, { schemaId: strSchemaId, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string; countryId?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.FIND_ALL, { schemaId: strSchemaId, ...payload }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(strSchemaId: string, id: string) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.FIND_ONE, { schemaId: strSchemaId, id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(strSchemaId: string, id: string, data: UpdateCityDto) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.UPDATE, { schemaId: strSchemaId, id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
