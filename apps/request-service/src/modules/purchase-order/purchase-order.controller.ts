import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { PurchaseOrderProperties } from '../../common/properties/purchase-order.properties';

@Controller()
export class PurchaseOrderController {
  private readonly logger = new AppLogger(PurchaseOrderController.name);

  constructor(
    private readonly purchaseOrderService: PurchaseOrderService,
  ) {
    this.logger.log(PurchaseOrderProperties.controller.start);
  }

  @MessagePattern('purchaseOrder.findAll')
  findAll() {
    this.logger.log(PurchaseOrderProperties.controller.findAll);
    return this.purchaseOrderService.findAll();
  }

  @MessagePattern('purchaseOrder.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`${PurchaseOrderProperties.controller.findOne}: ${id}`);
    return this.purchaseOrderService.findOne(id);
  }

  @MessagePattern('purchaseOrder.create')
  create(@Payload() data: CreatePurchaseOrderDto) {
    this.logger.log(PurchaseOrderProperties.controller.create);
    return this.purchaseOrderService.create(data);
  }

  @MessagePattern('purchaseOrder.update')
  update(@Payload() payload: { id: string; data: UpdatePurchaseOrderDto }) {
    this.logger.log(`${PurchaseOrderProperties.controller.update}: ${payload.id}`);
    return this.purchaseOrderService.update(payload.id, payload.data);
  }

  @MessagePattern('purchaseOrder.delete')
  delete(@Payload() id: string) {
    this.logger.log(`${PurchaseOrderProperties.controller.delete}: ${id}`);
    return this.purchaseOrderService.delete(id);
  }
}
