import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
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

  @MessagePattern('quotation.findAll')
  findAll() {
    this.logger.log(QuotationProperties.controller.findAll);
    return this.quotationService.findAll();
  }

  @MessagePattern('quotation.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`${QuotationProperties.controller.findOne}: ${id}`);
    return this.quotationService.findOne(id);
  }

  @MessagePattern('quotation.create')
  create(
    @Payload() data: CreateQuotationDto,
  ) {
    this.logger.log(QuotationProperties.controller.create);
    return this.quotationService.create(data);
  }

  @MessagePattern('quotation.update')
  update(
    @Payload()
    payload: {
      id: string;
      data: UpdateQuotationDto;
    },
  ) {
    this.logger.log(`${QuotationProperties.controller.update}: ${payload.id}`);
    return this.quotationService.update(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern('quotation.delete')
  delete(@Payload() id: string) {
    this.logger.log(`${QuotationProperties.controller.delete}: ${id}`);
    return this.quotationService.delete(id);
  }
}
