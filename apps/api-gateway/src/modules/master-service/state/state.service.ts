import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateStateDto, UpdateStateDto } from './dto/state.dto';
import { STATE_PATTERN } from './state.pattern';

@Injectable()
export class StateGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(StateGatewayService.name);
  }

  async create(strSchemaId: string, data: CreateStateDto) {
    try {
      return await firstValueFrom(
        this.client.send(STATE_PATTERN.CREATE, { schemaId: strSchemaId, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string; countryId?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(STATE_PATTERN.FIND_ALL, { schemaId: strSchemaId, ...payload }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(strSchemaId: string, id: string) {
    try {
      return await firstValueFrom(
        this.client.send(STATE_PATTERN.FIND_ONE, { schemaId: strSchemaId, id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(strSchemaId: string, id: string, data: UpdateStateDto) {
    try {
      return await firstValueFrom(
        this.client.send(STATE_PATTERN.UPDATE, { schemaId: strSchemaId, id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
