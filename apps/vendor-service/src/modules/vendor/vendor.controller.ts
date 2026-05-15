import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller()
export class VendorController {
  constructor(
    private readonly vendorService: VendorService,
  ) { }

  @MessagePattern('vendor.findAll')
  findAll() {
    return this.vendorService.findAll();
  }

  @MessagePattern('vendor.findOne')
  findOne(@Payload() data: { vendor_id: string }) {
    return this.vendorService.findOne(data.vendor_id);
  }

  @MessagePattern('vendor.create')
  create(@Payload() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }
}