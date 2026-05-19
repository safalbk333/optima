import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { VendorProperties } from '../../common/properties/vendor.properties';

@Controller()
export class VendorController {
  private readonly logger = new AppLogger(VendorController.name);

  constructor(
    private readonly vendorService: VendorService,
  ) {
    this.logger.log(VendorProperties.controller.start);
  }

  @MessagePattern('vendor.findAll')
  findAll() {
    this.logger.log(VendorProperties.controller.findAll);
    return this.vendorService.findAll();
  }

  @MessagePattern('vendor.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${VendorProperties.controller.findOne}: ${data.id}`);
    return this.vendorService.findOne(data.id);
  }

  @MessagePattern('vendor.create')
  create(@Payload() createVendorDto: CreateVendorDto) {
    this.logger.log(VendorProperties.controller.create);
    return this.vendorService.create(createVendorDto);
  }
}