import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VendorGatewayService } from './vendor.service';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';

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
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by Company name',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: ['PENDING', 'ACTIVE', 'BLACKLISTED', 'INACTIVE'],
    description: 'Filter for status',
  })
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const payload = {
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
      search,
      status
    };
    return this.vendorService.findAll(payload);
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

  @Put(':id')
  @ApiOperation({ summary: 'Update vendor' })
  @ApiResponse({ status: 200, description: 'Vendor updated successfully' })
  update(@Param('id') id: string, @Body() data: UpdateVendorDto) {
    return this.vendorService.update(id, data);
  }
}