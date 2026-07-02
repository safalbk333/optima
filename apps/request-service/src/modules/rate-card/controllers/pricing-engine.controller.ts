import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PricingEngineService } from '../services/pricing-engine.service';
import { CalculatePriceDto } from '../dto/pricing-engine/calculate-price.dto';
import { AppLogger } from '../../../common/logger/app.logger';

@Controller()
export class PricingEngineController {
  private readonly logger = new AppLogger(PricingEngineController.name);

  constructor(private readonly pricingEngineService: PricingEngineService) {
    this.logger.log('PricingEngineController initialized');
  }

  @MessagePattern('pricing.calculate')
  calculate(@Payload() dto: CalculatePriceDto) {
    this.logger.log(
      `pricing.calculate: vendor=${dto.fk_vendor_id} item=${dto.fk_item_id}`,
    );
    return this.pricingEngineService.calculatePrice(dto);
  }
}