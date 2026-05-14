import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { VENDOR_PATTERN } from './vendor.pattern';


@Injectable()
export class VendorGatewayService {
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(
       VENDOR_PATTERN.FIND_ALL,
        {},
      ),
    );
  }


}