import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { VendorService } from './vendor.service';

@Controller()
export class VendorController {
  constructor(
    private readonly vendorService: VendorService,
  ) {}

  @MessagePattern('vendor.findAll')
  findAll() {
    return this.vendorService.findAll();
  }

}