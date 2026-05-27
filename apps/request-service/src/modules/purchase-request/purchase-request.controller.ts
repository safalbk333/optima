import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { PurchaseRequestService } from './purchase-request.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { PurchaseRequestProperties } from '../../common/properties/purchase-request.properties';

@Controller()
export class PurchaseRequestController {
  private readonly logger = new AppLogger(PurchaseRequestController.name);

  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
  ) {
    this.logger.log(PurchaseRequestProperties.controller.start);
  }

  @MessagePattern('purchaseRequest.findAll')
  findAll() {
    this.logger.log(PurchaseRequestProperties.controller.findAll);
    return this.purchaseRequestService.findAll();
  }

  @MessagePattern('purchaseRequest.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`${PurchaseRequestProperties.controller.findOne}: ${id}`);
    return this.purchaseRequestService.findOne(id);
  }

  @MessagePattern('purchaseRequest.create')
  create(
    @Payload() data: CreatePurchaseRequestDto,
  ) {
    this.logger.log(PurchaseRequestProperties.controller.create);
    return this.purchaseRequestService.create(data);
  }

  @MessagePattern('purchaseRequest.update')
  update(
    @Payload()
    payload: {
      id: string;
      data: UpdatePurchaseRequestDto;
    },
  ) {
    this.logger.log(`${PurchaseRequestProperties.controller.update}: ${payload.id}`);
    return this.purchaseRequestService.update(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern('purchaseRequest.delete')
  delete(@Payload() id: string) {
    this.logger.log(`${PurchaseRequestProperties.controller.delete}: ${id}`);
    return this.purchaseRequestService.delete(id);
  }
}
