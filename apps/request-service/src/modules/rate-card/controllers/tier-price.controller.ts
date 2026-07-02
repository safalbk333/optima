import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TierPriceService } from '../services/tier-price.service';
import { CreateTierPriceDto } from '../dto/tier-price/create-tier-price.dto';
import { UpdateTierPriceDto } from '../dto/tier-price/update-tier-price.dto';
import { AppLogger } from '../../../common/logger/app.logger';

@Controller()
export class TierPriceController {
  private readonly logger = new AppLogger(TierPriceController.name);

  constructor(private readonly tierPriceService: TierPriceService) {
    this.logger.log('TierPriceController initialized');
  }

  @MessagePattern('tier-price.create')
  create(
    @Payload() data: { rateCardId: string; itemId: string; dto: CreateTierPriceDto },
  ) {
    this.logger.log(`tier-price.create: item=${data.itemId}`);
    return this.tierPriceService.create(data.rateCardId, data.itemId, data.dto);
  }

  @MessagePattern('tier-price.update')
  update(
    @Payload() data: { rateCardId: string; itemId: string; tierId: string; dto: UpdateTierPriceDto },
  ) {
    this.logger.log(`tier-price.update: tier=${data.tierId}`);
    return this.tierPriceService.update(data.rateCardId, data.itemId, data.tierId, data.dto);
  }

  @MessagePattern('tier-price.delete')
  delete(@Payload() data: { rateCardId: string; itemId: string; tierId: string }) {
    this.logger.log(`tier-price.delete: tier=${data.tierId}`);
    return this.tierPriceService.delete(data.rateCardId, data.itemId, data.tierId);
  }
}