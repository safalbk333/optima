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
    @Inject('CONTRACTS_SERVICE')
    private readonly contractClient: ClientProxy,
    @Inject('SHIPMENT_SERVICE')
    private readonly shipmentClient: ClientProxy,
  ) {}

  async healthCheckForVendorService() {
    return await firstValueFrom(
      this.vendorClient.send(
        'health.vendor',
        {},
      ),
    );
  }

  async healthCheckForContractService() {
    return await firstValueFrom(
      this.contractClient.send(
        'health.contract',
        {},
      ),
    );
  }

async healthCheckForShipmentService() {
    return await firstValueFrom(
      this.shipmentClient.send(
        'health.shipment',
        {},
      ),
    );
  }
}