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
import { GoodsReceivedGatewayService } from './goods-received.service';

@ApiTags('Goods Received-Service')
@Controller('goodsReceived')
export class GoodsReceivedController {
  constructor(
    private readonly goodsReceivedService: GoodsReceivedGatewayService,
  ) { }

  // @Post()
  // @ApiOperation({
  //   summary: 'Create a new quotation',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description:
  //     'Quotation created successfully',
  // })
  // create(@Body() data: CreateShipmentDto) {
  //   return this.shipmentService.create(data);
  // }

  @Get()
  @ApiOperation({
    summary: 'Get all goods received records',
  })
  @ApiResponse({
    status: 200,
    description:
      'Goods received list fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of goods received records per page',
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
    enum: ['PARTIALLY_ACCEPTED', 'ACCEPTED', 'PENDING', 'REJECTED',],
    description: 'Filter by goods received status',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search for goods received records (goods received number, goods received title)',
  })
  @ApiQuery({
    name: 'warehouse',
    required: false,
    type: String,
    description: 'Filter by warehouse',
  })
  findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
    @Query('warehouse') warehouse?: string,
    @Query('status') status?: string,
  ) {
    const payload = {
      limit: Number(limit),
      page: Number(page),
      search: search,
      status: status,
      warehouse: warehouse,
    };
    return this.goodsReceivedService.findAll(payload);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get goods received record by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Goods received record fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.goodsReceivedService.findOne(id);
  }
}