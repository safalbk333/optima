import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { PurchaseOrderGatewayService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@ApiTags('Purchase-Order-Service')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(
    private readonly purchaseOrderService: PurchaseOrderGatewayService,
  ) { }

  @Post('by-vendor')
  @ApiOperation({ summary: 'Get purchase orders by vendor id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { vendorId: { type: 'string' } },
      required: ['vendorId'],
    },
  })
  @ApiResponse({ status: 200, description: 'Purchase orders fetched successfully' })
  findByVendorId(@Body('vendorId') vendorId: string) {
    return this.purchaseOrderService.findByVendorId(vendorId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new purchase order' })
  @ApiResponse({ status: 200, description: 'Purchase order created successfully' })
  create(@Body() data: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all purchase orders' })
  @ApiResponse({ status: 200, description: 'Purchase order list fetched successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of purchase orders per page' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by status' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search for purchase orders' })
  findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const payload = {
      limit: Number(limit),
      page: Number(page),
      search: search,
      status: status,
    };
    return this.purchaseOrderService.findAll(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get purchase order by id' })
  @ApiResponse({ status: 200, description: 'Purchase order fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update purchase order' })
  @ApiResponse({ status: 200, description: 'Purchase order updated successfully' })
  update(
    @Param('id') id: string,
    @Body() data: UpdatePurchaseOrderDto,
  ) {
    return this.purchaseOrderService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete purchase order' })
  @ApiResponse({ status: 200, description: 'Purchase order deleted successfully' })
  delete(@Param('id') id: string) {
    return this.purchaseOrderService.delete(id);
  }
}
