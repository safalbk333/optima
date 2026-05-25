import {
  Inject,
  Logger,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GOODS_RECEIVED_PATTERN } from './goods-received.pattern';

@Injectable()
export class GoodsReceivedGatewayService {
  private readonly logger: Logger;
  constructor(
    @Inject('SHIPMENT_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(GoodsReceivedGatewayService.name);
  }
  
  async findAll(payload: any) {
    try{
      return await firstValueFrom(
        this.client.send(
          GOODS_RECEIVED_PATTERN.FIND_ALL,
          payload,
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
          GOODS_RECEIVED_PATTERN.FIND_ONE,
          { id },
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }
}