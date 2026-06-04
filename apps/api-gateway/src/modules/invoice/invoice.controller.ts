import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { InvoiceGatewayService } from './invoice.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@ApiTags('Invoice-Service')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceGatewayService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new invoice',
    description: 'Creates a new invoice for a purchase order',
  })
  @ApiBody({
    type: CreateInvoiceDto,
    description: 'Invoice creation payload',
    examples: {
      example1: {
        summary: 'Standard invoice',
        value: {
          chr_invoice_number: 'INV-2026-001',
          fk_chr_purchase_order_id: 'po-123456',
          fk_chr_goods_receipt_id: 'gr-789456',
          fk_chr_request_id: 'req-123456',
          fk_chr_vendor_id: 'vendor-001',
          flt_subtotal: 1000.0,
          flt_tax_amount: 150.0,
          flt_total_amount: 1150.0,
          chr_currency: 'USD',
          dt_invoice_date: '2026-06-04T00:00:00Z',
          dt_due_date: '2026-07-04T00:00:00Z',
          txt_notes: 'Payment terms: Net 30',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Invoice created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid invoice data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all invoices',
    description: 'Retrieves a list of all invoices with pagination and search support',
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    required: false,
    description: 'Number of records to skip (offset)',
    example: 0,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    required: false,
    description: 'Number of records to retrieve (limit, max 100)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    description: 'Search by invoice number, vendor name, or other fields',
    example: 'INV-2026-001',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of invoices retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid pagination or search parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    const skipValue = skip ? parseInt(skip, 10) : 0;
    const takeValue = take ? parseInt(take, 10) : 10;

    return this.invoiceService.findAll(skipValue, takeValue, search);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get invoice by ID',
    description: 'Retrieves a specific invoice by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Invoice ID',
    example: 'inv-123456',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invoice retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid invoice ID',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update invoice',
    description: 'Updates an existing invoice with partial or full data',
  })
  @ApiParam({
    name: 'id',
    description: 'Invoice ID',
    example: 'inv-123456',
    type: String,
  })
  @ApiBody({
    type: UpdateInvoiceDto,
    description: 'Invoice update payload (all fields optional)',
    examples: {
      example1: {
        summary: 'Update amount',
        value: {
          flt_subtotal: 1200.0,
          flt_tax_amount: 180.0,
          flt_total_amount: 1380.0,
        },
      },
      example2: {
        summary: 'Update due date',
        value: {
          dt_due_date: '2026-08-04T00:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invoice updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid invoice ID or update data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, dto);
  }

  @Patch(':id/pay')
  @ApiOperation({
    summary: 'Mark invoice as paid',
    description: 'Marks an invoice as paid',
  })
  @ApiParam({
    name: 'id',
    description: 'Invoice ID',
    example: 'inv-123456',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invoice marked as paid successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid invoice ID',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  markAsPaid(@Param('id') id: string) {
    return this.invoiceService.markAsPaid(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete invoice',
    description: 'Deletes an invoice permanently',
  })
  @ApiParam({
    name: 'id',
    description: 'Invoice ID',
    example: 'inv-123456',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invoice deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid invoice ID',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }

  // Message Patterns for Microservices Communication
  @MessagePattern('gateway.invoice.create')
  async handleMessageCreate(@Payload() dto: CreateInvoiceDto) {
    return this.invoiceService.create(dto);
  }

  @MessagePattern('gateway.invoice.findAll')
  async handleMessageFindAll(
    @Payload() payload: { skip?: number; take?: number; search?: string },
  ) {
    return this.invoiceService.findAll(
      payload.skip || 0,
      payload.take || 10,
      payload.search,
    );
  }

  @MessagePattern('gateway.invoice.findOne')
  async handleMessageFindOne(@Payload() payload: { id: string }) {
    return this.invoiceService.findOne(payload.id);
  }

  @MessagePattern('gateway.invoice.update')
  async handleMessageUpdate(
    @Payload() payload: { id: string; data: UpdateInvoiceDto },
  ) {
    return this.invoiceService.update(payload.id, payload.data);
  }

  @MessagePattern('gateway.invoice.markAsPaid')
  async handleMessageMarkAsPaid(@Payload() payload: { id: string }) {
    return this.invoiceService.markAsPaid(payload.id);
  }

  @MessagePattern('gateway.invoice.remove')
  async handleMessageRemove(@Payload() payload: { id: string }) {
    return this.invoiceService.remove(payload.id);
  }
  @MessagePattern('invoice.findByVendorId')
async handleFindByVendorId(
  @Payload()
  payload: {
    vendorId: string;
    skip?: number;
    take?: number;
  },
) {
  return this.invoiceService.findByVendorId(
    payload.vendorId,
    payload.skip || 0,
    payload.take || 10,
  );
}

  @Get('vendor/:vendorId')
  @ApiOperation({
    summary: 'Get invoices by vendor ID',
    description: 'Retrieves invoices for a specific vendor with pagination',
  })
  @ApiParam({
    name: 'vendorId',
    description: 'Vendor ID',
    example: 'vendor-001',
    type: String,
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    required: false,
    description: 'Number of records to skip (offset)',
    example: 0,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    required: false,
    description: 'Number of records to retrieve (limit)',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invoices for vendor retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid vendor ID or pagination parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findByVendorId(
    @Param('vendorId') vendorId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.invoiceService.findByVendorId(
      vendorId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 10,
    );
  }
}
