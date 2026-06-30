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

  async create(data: CreateCountryDto) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.CREATE, data),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.FIND_ALL, payload),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.FIND_ONE, { id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, data: UpdateCountryDto) {
    try {
      return await firstValueFrom(
        this.client.send(COUNTRY_PATTERN.UPDATE, { id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
