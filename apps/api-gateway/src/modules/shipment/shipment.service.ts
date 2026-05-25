import {
  Inject,
  Logger,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SHIPMENT_PATTERN } from './shipment.pattern';

@Injectable()
export class ShipmentGatewayService {
  private readonly logger: Logger;
  constructor(
    @Inject('SHIPMENT_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(ShipmentGatewayService.name);
  }
  
  async findAll(payload: any) {
    try{
      return await firstValueFrom(
        this.client.send(
          SHIPMENT_PATTERN.FIND_ALL,
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
          SHIPMENT_PATTERN.FIND_ONE,
          { id },
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }
}