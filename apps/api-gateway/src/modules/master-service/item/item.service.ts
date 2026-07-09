import { Inject, Logger, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITEM_PATTERN } from './item.pattern';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(ItemGatewayService.name);
  }

  async create(strSchemaId: string, data: CreateItemDto) {
    try {
      return await firstValueFrom(this.client.send(ITEM_PATTERN.CREATE, { schemaId: strSchemaId, data }));
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string; category_id?: string; category_name?: string }) {
    try {
      return await firstValueFrom(this.client.send(ITEM_PATTERN.FIND_ALL, { schemaId: strSchemaId, ...payload }));
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(strSchemaId: string, id: string) {
    try {
      return await firstValueFrom(this.client.send(ITEM_PATTERN.FIND_ONE, { schemaId: strSchemaId, id }));
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(strSchemaId: string, id: string, data: UpdateItemDto) {
    try {
      return await firstValueFrom(this.client.send(ITEM_PATTERN.UPDATE, { schemaId: strSchemaId, id, data }));
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
