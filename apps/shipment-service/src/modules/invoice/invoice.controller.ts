import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { InvoiceService } from './invoice.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
  ) {}

  // Message Patterns for Microservices
  @MessagePattern('invoice.create')
  async handleCreate(
    @Payload() payload: { data: CreateInvoiceDto },
  ) {
    const userId = payload.data['fk_created_id'] || 'SYSTEM';
    return this.invoiceService.create(payload.data, userId);
  }

  @MessagePattern('invoice.findAll')
  async handleFindAll(
    @Payload() payload: { skip?: number; take?: number; search?: string },
  ) {
    return this.invoiceService.findAll(
      payload.skip || 0,
      payload.take || 10,
      payload.search,
    );
  }

  @MessagePattern('invoice.findOne')
  async handleFindOne(
    @Payload() payload: { id: string },
  ) {
    return this.invoiceService.findOne(payload.id);
  }

  @MessagePattern('invoice.update')
  async handleUpdate(
    @Payload() payload: { id: string; data: UpdateInvoiceDto },
  ) {
    const userId = 'SYSTEM';
    return this.invoiceService.update(
      payload.id,
      payload.data,
      userId,
    );
  }

  @MessagePattern('invoice.markAsPaid')
  async handleMarkAsPaid(
    @Payload() payload: { id: string },
  ) {
    const userId = 'SYSTEM';
    return this.invoiceService.markAsPaid(
      payload.id,
      userId,
    );
  }

  @MessagePattern('invoice.remove')
  async handleRemove(
    @Payload() payload: { id: string },
  ) {
    return this.invoiceService.remove(payload.id);
  }
}