import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { GoodsReceiptService } from './goods-receipt.service';
import { CreateGoodsReceiptDto } from './dto/create-goods-receipt.dto';
import { UpdateGoodsReceiptDto } from './dto/update-goods-receipt.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { GoodsReceiptProperties } from '../../common/properties/goods-receipt.properties';

@Controller()
export class GoodsReceiptController {
  private readonly logger = new AppLogger(GoodsReceiptController.name);

  constructor(
    private readonly goodsReceiptService: GoodsReceiptService,
  ) {
    this.logger.log(GoodsReceiptProperties.controller.start);
  }

  @MessagePattern('goodsReceipt.findAll')
  findAll() {
    this.logger.log(GoodsReceiptProperties.controller.findAll);
    return this.goodsReceiptService.findAll();
  }

  @MessagePattern('goodsReceipt.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`${GoodsReceiptProperties.controller.findOne}: ${id}`);
    return this.goodsReceiptService.findOne(id);
  }

  @MessagePattern('goodsReceipt.create')
  create(@Payload() data: CreateGoodsReceiptDto) {
    this.logger.log(GoodsReceiptProperties.controller.create);
    return this.goodsReceiptService.create(data);
  }

  @MessagePattern('goodsReceipt.update')
  update(@Payload() payload: { id: string; data: UpdateGoodsReceiptDto }) {
    this.logger.log(`${GoodsReceiptProperties.controller.update}: ${payload.id}`);
    return this.goodsReceiptService.update(payload.id, payload.data);
  }

  @MessagePattern('goodsReceipt.delete')
  delete(@Payload() id: string) {
    this.logger.log(`${GoodsReceiptProperties.controller.delete}: ${id}`);
    return this.goodsReceiptService.delete(id);
  }
}
