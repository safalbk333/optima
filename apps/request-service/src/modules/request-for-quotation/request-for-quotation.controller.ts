import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RequestForQuotationService } from './request-for-quotation.service';
import { CreateRequestForQuotationDto } from './dto/create-request-for-quotation.dto';
import { UpdateRequestForQuotationDto } from './dto/update-request-for-quotation.dto';

@Controller()
export class RequestForQuotationController {
  constructor(
    private readonly requestForQuotationService: RequestForQuotationService,
  ) {}

  @MessagePattern({ cmd: 'rfq.findAll' })
  findAll() {
    return this.requestForQuotationService.findAll();
  }

  @MessagePattern({ cmd: 'rfq.findOne' })
  findOne(id: string) {
    return this.requestForQuotationService.findOne(id);
  }

  @MessagePattern({ cmd: 'rfq.create' })
  create(data: CreateRequestForQuotationDto) {
    return this.requestForQuotationService.create(data);
  }

  @MessagePattern({ cmd: 'rfq.update' })
  update(payload: { id: string; data: UpdateRequestForQuotationDto }) {
    return this.requestForQuotationService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'rfq.delete' })
  delete(id: string) {
    return this.requestForQuotationService.delete(id);
  }
}
