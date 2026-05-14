import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';

@Controller()
export class QuotationController {
  constructor(
    private readonly quotationService: QuotationService,
  ) {}

  @MessagePattern('quotation.create')
  create(@Payload() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @MessagePattern('quotation.findAll')
  findAll() {
    return this.quotationService.findAll();
  }

  @MessagePattern('quotation.findOne')
  findOne(@Payload() data: { quotation_id: string }) {
    return this.quotationService.findOne(data.quotation_id);
  }
}