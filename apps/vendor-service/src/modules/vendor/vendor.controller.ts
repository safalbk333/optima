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

  @MessagePattern('vendor.findOne')
  findOne(@Payload() id: string) {
    return this.vendorService.findOne(id);
  }

  @MessagePattern('vendor.create')
  create(@Payload() data: any) {
    return this.vendorService.create(data);
  }
}