import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ShipmentGatewayService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@ApiTags('Shipment-Service')
@Controller('shipment')
export class ShipmentController {
  constructor(
    private readonly shipmentService: ShipmentGatewayService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create new ASN',
  })
  @ApiResponse({
    status: 200,
    description:
      'ASN created successfully',
  })
  create(@Body() data: CreateShipmentDto) {
    return this.shipmentService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all shipments',
  })
  @ApiResponse({
    status: 200,
    description:
      'Shipment list fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of shipments per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: ['DELIVERED', 'DELAYED', 'CANCELLED', 'IN_TRANSMIT',],
    description: 'Filter by shipment status',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search for shipments (shipment number, shipment title)',
  })
  @ApiQuery({
    name: 'carrier',
    required: false,
    type: String,
    description: 'Filter by carrier',
  })
  findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
    @Query('carrier') carrier?: string,
    @Query('status') status?: string,
  ) {
    const payload = {
      limit: Number(limit),
      page: Number(page),
      search: search,
      status: status,
      carrier: carrier,
    };
    return this.shipmentService.findAll(payload);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get shipment by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Shipment fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(id);
  }
}