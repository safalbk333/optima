import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { PURCHASE_REQUEST_PATTERN } from './purchase-request.pattern';

@Injectable()
export class PurchaseRequestGatewayService {
  constructor(
    @Inject('REQUEST_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(
        PURCHASE_REQUEST_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(
        PURCHASE_REQUEST_PATTERN.FIND_ONE,
        id,
      ),
    );
  }

  async create(data: CreatePurchaseRequestDto) {
    return await firstValueFrom(
      this.client.send(
        PURCHASE_REQUEST_PATTERN.CREATE,
        data,
      ),
    );
  }

  async update(
    id: string,
    data: UpdatePurchaseRequestDto,
  ) {
    return await firstValueFrom(
      this.client.send(
        PURCHASE_REQUEST_PATTERN.UPDATE,
        { id, data },
      ),
    );
  }

  async delete(id: string) {
    return await firstValueFrom(
      this.client.send(
        PURCHASE_REQUEST_PATTERN.DELETE,
        id,
      ),
    );
  }
}
