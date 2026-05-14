import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QUOTATION_PATTERN } from './quotation.pattern';

@Injectable()
export class QuotationGatewayService {
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async create(data: any) {
    return await firstValueFrom(
      this.client.send(
        QUOTATION_PATTERN.CREATE,
        data,
      ),
    );
  }
  
  async findAll() {
    return await firstValueFrom(
      this.client.send(
        QUOTATION_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(
        QUOTATION_PATTERN.FIND_ONE,
        { id },
      ),
    );
  }
}