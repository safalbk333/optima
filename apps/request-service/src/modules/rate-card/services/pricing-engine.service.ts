import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CalculatePriceDto } from '../dto/pricing-engine/calculate-price.dto';
import { PriceResultDto } from '../dto/pricing-engine/price-result.dto';
import { VendorItemPriceService } from './vendor-item-price.service';
import { PricingType } from '../enums/pricing-type.enum';
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';

@Injectable()
export class PricingEngineService {
  private readonly logger = new Logger(PricingEngineService.name);

  constructor(private readonly vendorItemPriceService: VendorItemPriceService) {}

  /**
   * Entry point for price calculation. Resolves the active rate card item
   * for the given vendor/item, dispatches to the correct pricing strategy
   * based on pricing_type, and returns a normalized result.
   */
  async calculatePrice(dto: CalculatePriceDto): Promise<PriceResultDto> {
    const mapping = await this.vendorItemPriceService.getActiveMapping(
      dto.fk_vendor_id,
      dto.fk_item_id,
    );

    const rateCardItem = mapping.rate_card_item;
    const rateCard = mapping.rate_card;

    let unit_price: number;
    let total_price: number;

    switch (rateCardItem.pricing_type) {
      case PricingType.FIXED:
        ({ unit_price, total_price } = this.calculateFixed(rateCardItem, dto.quantity));
        break;
      case PricingType.TIER:
        ({ unit_price, total_price } = this.calculateTier(rateCardItem, dto.quantity));
        break;
      case PricingType.MILESTONE:
        ({ unit_price, total_price } = this.calculateMilestone(rateCardItem, dto.milestone_name));
        break;
      default:
        throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.INVALID_PRICING_TYPE);
    }

    this.logger.log(
      `Price calculated for vendor=${dto.fk_vendor_id} item=${dto.fk_item_id} type=${rateCardItem.pricing_type} unit_price=${unit_price}`,
    );

    return new PriceResultDto({
      fk_vendor_id: dto.fk_vendor_id,
      fk_item_id: dto.fk_item_id,
      fk_rate_card_id: rateCard.pk_rate_card_id,
      rate_card_code: rateCard.rate_card_code,
      pricing_type: rateCardItem.pricing_type,
      quantity: dto.quantity,
      milestone_name: dto.milestone_name,
      unit_price,
      total_price,
      currency: rateCardItem.currency,
    });
  }

  calculateFixed(
    rateCardItem: { fixed_price: { unit_price: number } | null },
    quantity?: number,
  ): { unit_price: number; total_price: number } {
    if (!rateCardItem.fixed_price) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.FIXED_PRICE_NOT_FOUND);
    }
    if (!quantity || quantity < 1) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.QUANTITY_REQUIRED);
    }

    const unit_price = rateCardItem.fixed_price.unit_price;
    const total_price = this.round(unit_price * quantity);

    return { unit_price, total_price };
  }

  calculateTier(
    rateCardItem: { tiers: { min_qty: number; max_qty: number; unit_price: number }[] },
    quantity?: number,
  ): { unit_price: number; total_price: number } {
    if (!quantity || quantity < 1) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.QUANTITY_REQUIRED);
    }

    const tier = rateCardItem.tiers.find(
      (t) => quantity >= t.min_qty && quantity <= t.max_qty,
    );

    if (!tier) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.NO_TIER_MATCH);
    }

    const unit_price = tier.unit_price;
    const total_price = this.round(unit_price * quantity);

    return { unit_price, total_price };
  }

  calculateMilestone(
    rateCardItem: { milestones: { milestone_name: string; unit_price: number }[] },
    milestone_name?: string,
  ): { unit_price: number; total_price: number } {
    if (!milestone_name) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.MILESTONE_REQUIRED);
    }

    const milestone = rateCardItem.milestones.find(
      (m) => m.milestone_name.toLowerCase() === milestone_name.toLowerCase(),
    );

    if (!milestone) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.NO_MILESTONE_MATCH);
    }

    const unit_price = milestone.unit_price;
    const total_price = this.round(unit_price);

    return { unit_price, total_price };
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}