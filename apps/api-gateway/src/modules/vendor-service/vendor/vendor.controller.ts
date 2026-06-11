import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VendorGatewayService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@ApiTags('Vendor-Service')
@Controller('vendor')
export class VendorController {
  constructor(
    private readonly vendorService: VendorGatewayService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new vendor',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vendor created successfully',
  })
  create(@Body() data: CreateVendorDto) {
    return this.vendorService.create(data);
  }

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

  @Get(':id')
  @ApiOperation({
    summary: 'Get vendor by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vendor fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }
}