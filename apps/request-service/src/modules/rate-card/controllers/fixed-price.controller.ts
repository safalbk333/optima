import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FixedPriceService } from '../services/fixed-price.service';
import { CreateFixedPriceDto } from '../dto/fixed-price/create-fixed-price.dto';
import { UpdateFixedPriceDto } from '../dto/fixed-price/update-fixed-price.dto';
import { AppLogger } from '../../../common/logger/app.logger';

@Controller()
export class FixedPriceController {
  private readonly logger = new AppLogger(FixedPriceController.name);

  constructor(private readonly fixedPriceService: FixedPriceService) {
    this.logger.log('FixedPriceController initialized');
  }

  @MessagePattern('fixed-price.create')
  create(
    @Payload() data: { rateCardId: string; itemId: string; dto: CreateFixedPriceDto },
  ) {
    this.logger.log(`fixed-price.create: item=${data.itemId}`);
    return this.fixedPriceService.create(data.rateCardId, data.itemId, data.dto);
  }

  @MessagePattern('fixed-price.update')
  update(
    @Payload() data: { rateCardId: string; itemId: string; dto: UpdateFixedPriceDto },
  ) {
    this.logger.log(`fixed-price.update: item=${data.itemId}`);
    return this.fixedPriceService.update(data.rateCardId, data.itemId, data.dto);
  }

  @MessagePattern('fixed-price.delete')
  delete(@Payload() data: { rateCardId: string; itemId: string }) {
    this.logger.log(`fixed-price.delete: item=${data.itemId}`);
    return this.fixedPriceService.delete(data.rateCardId, data.itemId);
  }
}