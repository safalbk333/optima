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

  async create(data: CreateCityDto) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.CREATE, data),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string; countryId?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.FIND_ALL, payload),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.FIND_ONE, { id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, data: UpdateCityDto) {
    try {
      return await firstValueFrom(
        this.client.send(CITY_PATTERN.UPDATE, { id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
