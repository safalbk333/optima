import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { QuotationProperties } from '../../common/properties/quotation.properties';

@Controller()
export class QuotationController {
  private readonly logger = new AppLogger(QuotationController.name);

  constructor(
    private readonly quotationService: QuotationService,
  ) {
    this.logger.log(QuotationProperties.controller.start);
  }

  @MessagePattern('quotation.create')
  create(@Payload() data: CreateQuotationDto) {
    this.logger.log(QuotationProperties.controller.create);
    return this.quotationService.create(data);
  }

  @MessagePattern('quotation.findAll')
  findAll(
     @Payload() payload: {
      limit?: number;
      page?: number;
      search?:string;
      status?: string;
    },
  ) {
    this.logger.log(QuotationProperties.controller.findAll);
    return this.quotationService.findAll(payload);
  }

  @MessagePattern('quotation.findOne')
  findOne(@Payload() data: { quotation_id: string }) {
    this.logger.log(`${QuotationProperties.controller.findOne}: ${data.quotation_id}`);
    return this.quotationService.findOne(data.quotation_id);
  }
}