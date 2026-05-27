import {
  Inject,
  Logger,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITEM_PATTERN } from './item.pattern';

@Injectable()
export class ItemGatewayService {
  private readonly logger: Logger;
  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(ItemGatewayService.name);
  }

  async create(data: any) {
    try{
      return await firstValueFrom(
        this.client.send(
          ITEM_PATTERN.CREATE,
          data,
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll() {
    try{
      return await firstValueFrom(
        this.client.send(
          ITEM_PATTERN.FIND_ALL,
          {},
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try{
      return await firstValueFrom(
        this.client.send(
          ITEM_PATTERN.FIND_ONE,
          { id },
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }
}