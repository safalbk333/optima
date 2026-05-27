import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PurchaseRequestGatewayService } from './purchase-request.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';

@ApiTags('Purchase Requests')
@Controller('purchase-requests')
export class PurchaseRequestController {
  constructor(
    private readonly purchaseRequestService: PurchaseRequestGatewayService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all purchase requests' })
  @ApiResponse({ status: 200, description: 'Returns all purchase requests' })
  findAll() {
    return this.purchaseRequestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get purchase request by ID' })
  @ApiResponse({ status: 200, description: 'Returns purchase request details' })
  @ApiResponse({ status: 404, description: 'Purchase request not found' })
  findOne(@Param('id') id: string) {
    return this.purchaseRequestService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new purchase request' })
  @ApiResponse({ status: 201, description: 'Purchase request created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createDto: CreatePurchaseRequestDto) {
    return this.purchaseRequestService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update purchase request' })
  @ApiResponse({ status: 200, description: 'Purchase request updated successfully' })
  @ApiResponse({ status: 404, description: 'Purchase request not found' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePurchaseRequestDto,
  ) {
    return this.purchaseRequestService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete purchase request' })
  @ApiResponse({ status: 200, description: 'Purchase request deleted successfully' })
  @ApiResponse({ status: 404, description: 'Purchase request not found' })
  delete(@Param('id') id: string) {
    return this.purchaseRequestService.delete(id);
  }
}
