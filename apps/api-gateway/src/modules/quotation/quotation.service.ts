import {
  Inject,
  Logger,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QUOTATION_PATTERN } from './quotation.pattern';

@Injectable()
export class QuotationGatewayService {
  private readonly logger: Logger;
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(QuotationGatewayService.name);
  }

  async create(data: any) {
    try{
      return await firstValueFrom(
        this.client.send(
          QUOTATION_PATTERN.CREATE,
          data,
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }
  
  async findAll(payload: any) {
    try{
      return await firstValueFrom(
        this.client.send(
          QUOTATION_PATTERN.FIND_ALL,
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
          QUOTATION_PATTERN.FIND_ONE,
          { id },
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }
}