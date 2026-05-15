import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITEM_PATTERN } from './item.pattern';

@Injectable()
export class ItemGatewayService {
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async create(data: any) {
    return await firstValueFrom(
      this.client.send(
        ITEM_PATTERN.CREATE,
        data,
      ),
    );
  }

  async findAll() {
    return await firstValueFrom(
      this.client.send(
        ITEM_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(
        ITEM_PATTERN.FIND_ONE,
        { id },
      ),
    );
  }
}