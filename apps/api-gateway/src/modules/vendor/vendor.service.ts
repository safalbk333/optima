import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';


@Injectable()
export class VendorGatewayService {
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(
        'vendor.findAll',
        {},
      ),
    );
  }


}