import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppLogger } from '../../common/logger/app.logger';
import { GoodsReceivedService } from './goods-received.service';
import { GoodsReceivedProperties } from '../../common/properties/goods-received.properties';

@Controller()
export class GoodsReceivedController {
  private readonly logger = new AppLogger(GoodsReceivedController.name);

  constructor(
    private readonly goodsReceivedService: GoodsReceivedService,
  ) {
    this.logger.log(GoodsReceivedProperties.controller.start);
  }

  @MessagePattern('goodsReceived.findAll')
  findAll(
     @Payload() payload: {
      limit?: number;
      page?: number;
      search?:string;
      status?: string;
      carrier?: string;
    },
  ) {
    this.logger.log(GoodsReceivedProperties.controller.findAll);
    return this.goodsReceivedService.findAll(payload);
  }

  @MessagePattern('goodsReceived.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${GoodsReceivedProperties.controller.findOne}: ${data.id}`);
    return this.goodsReceivedService.findOne(data.id);
  }
}