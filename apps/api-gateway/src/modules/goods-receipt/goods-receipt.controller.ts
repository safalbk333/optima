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
} from '@nestjs/swagger';
import { GoodsReceiptGatewayService } from './goods-receipt.service';
import { CreateGoodsReceiptDto } from './dto/create-goods-receipt.dto';
import { UpdateGoodsReceiptDto } from './dto/update-goods-receipt.dto';

@ApiTags('Goods-Receipt-Service')
@Controller('goods-receipt')
export class GoodsReceiptController {
  constructor(
    private readonly goodsReceiptService: GoodsReceiptGatewayService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new goods receipt' })
  @ApiResponse({ status: 200, description: 'Goods receipt created successfully' })
  create(@Body() data: CreateGoodsReceiptDto) {
    return this.goodsReceiptService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all goods receipts' })
  @ApiResponse({ status: 200, description: 'Goods receipt list fetched successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records per page' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by status' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search goods receipts' })
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
    return this.goodsReceiptService.findAll(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get goods receipt by id' })
  @ApiResponse({ status: 200, description: 'Goods receipt fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.goodsReceiptService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update goods receipt' })
  @ApiResponse({ status: 200, description: 'Goods receipt updated successfully' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateGoodsReceiptDto,
  ) {
    return this.goodsReceiptService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete goods receipt' })
  @ApiResponse({ status: 200, description: 'Goods receipt deleted successfully' })
  delete(@Param('id') id: string) {
    return this.goodsReceiptService.delete(id);
  }
}
