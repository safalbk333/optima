import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly vendorClient: ClientProxy,
  ) {}

  async healthCheckForVendorService() {
    return await firstValueFrom(
      this.vendorClient.send(
        'health.vendor',
        {},
      ),
    );
  }
}