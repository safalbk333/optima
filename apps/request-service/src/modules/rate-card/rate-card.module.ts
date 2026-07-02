import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '../../prisma/prisma.module';

// Controllers
import { RateCardController } from './controllers/rate-card.controller';
import { RateCardItemController } from './controllers/rate-card-item.controller';
import { FixedPriceController } from './controllers/fixed-price.controller';
import { TierPriceController } from './controllers/tier-price.controller';
import { MilestonePriceController } from './controllers/milestone-price.controller';
import { PricingEngineController } from './controllers/pricing-engine.controller';

// Services
import { RateCardService } from './services/rate-card.service';
import { RateCardItemService } from './services/rate-card-item.service';
import { FixedPriceService } from './services/fixed-price.service';
import { TierPriceService } from './services/tier-price.service';
import { MilestonePriceService } from './services/milestone-price.service';
import { PricingEngineService } from './services/pricing-engine.service';
import { VendorItemPriceService } from './services/vendor-item-price.service';
import { RateCardValidationService } from './services/rate-card-validation.service';

// Scheduler
import { RateCardScheduler } from './schedulers/rate-card.scheduler';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [
    RateCardController,
    RateCardItemController,
    FixedPriceController,
    TierPriceController,
    MilestonePriceController,
    PricingEngineController,
  ],
  providers: [
    RateCardService,
    RateCardItemService,
    FixedPriceService,
    TierPriceService,
    MilestonePriceService,
    PricingEngineService,
    VendorItemPriceService,
    RateCardValidationService,
    RateCardScheduler,
  ],
  exports: [
    RateCardService,
    PricingEngineService,
    VendorItemPriceService,
  ],
})
export class RateCardModule {}