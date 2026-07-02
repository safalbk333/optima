import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { VendorService } from './vendor.service';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';
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
  findAll(
    @Payload() payload: {
      limit?: number;
      page?: number;
      search?: string;
    }
  ) {
    this.logger.log(VendorProperties.controller.findAll);
    return this.vendorService.findAll(payload);
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

  @MessagePattern('vendor.update')
    update(@Payload()
    payload: {
      id: string;
      data: UpdateVendorDto;
    },
    ) {
      this.logger.log(`${VendorProperties.controller.update}: ${payload.id}`,);
      return this.vendorService.update(
        payload.id,
        payload.data,
      );
    }
}