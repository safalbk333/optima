import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RequestForQuotationGatewayService } from './request-for-quotation.service';
import { CreateRequestForQuotationDto } from './dto/create-request-for-quotation.dto';
import { UpdateRequestForQuotationDto } from './dto/update-request-for-quotation.dto';

@ApiTags('Request for Quotation')
@Controller('request-for-quotation')
export class RequestForQuotationController {
  constructor(
    private readonly rfqService: RequestForQuotationGatewayService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all RFQs' })
  @ApiResponse({ status: 200, description: 'Returns all RFQs' })
  findAll() {
    return this.rfqService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get RFQ by ID' })
  @ApiResponse({ status: 200, description: 'Returns RFQ details' })
  @ApiResponse({ status: 404, description: 'RFQ not found' })
  findOne(@Param('id') id: string) {
    return this.rfqService.findOne(id);
  }

  @Post('by-vendor')
  @ApiOperation({ summary: 'Get RFQs by vendor id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { vendorId: { type: 'string' } },
      required: ['vendorId'],
    },
  })
  @ApiResponse({ status: 200, description: 'RFQs fetched successfully' })
  findByVendorId(@Body('vendorId') vendorId: string) {
    return this.rfqService.findByVendorId(vendorId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new RFQ' })
  @ApiResponse({ status: 201, description: 'RFQ created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createDto: CreateRequestForQuotationDto) {
    return this.rfqService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update RFQ' })
  @ApiResponse({ status: 200, description: 'RFQ updated successfully' })
  @ApiResponse({ status: 404, description: 'RFQ not found' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRequestForQuotationDto,
  ) {
    return this.rfqService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete RFQ' })
  @ApiResponse({ status: 200, description: 'RFQ deleted successfully' })
  @ApiResponse({ status: 404, description: 'RFQ not found' })
  delete(@Param('id') id: string) {
    return this.rfqService.delete(id);
  }
}
