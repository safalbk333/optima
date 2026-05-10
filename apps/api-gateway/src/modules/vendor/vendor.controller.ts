import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { VendorGatewayService } from './vendor.service';

@ApiTags('Vendor-Service')
@Controller('vendor')
export class VendorController {
  constructor(
    private readonly vendorService: VendorGatewayService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all vendors',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vendor list fetched successfully',
  })
  findAll() {
    return this.vendorService.findAll();
  }
}