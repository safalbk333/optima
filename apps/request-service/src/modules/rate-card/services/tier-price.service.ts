import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { CreateTierPriceDto } from '../dto/tier-price/create-tier-price.dto';
import { UpdateTierPriceDto } from '../dto/tier-price/update-tier-price.dto';
import { RateCardItemService } from './rate-card-item.service';
import { RateCardValidationService } from './rate-card-validation.service';
import { PricingType } from '../enums/pricing-type.enum';
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';
import { AppLogger } from '../../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class TierPriceService {
  private readonly logger = new AppLogger(TierPriceService.name);
  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly rateCardItemService: RateCardItemService,
    private readonly validationService: RateCardValidationService,
  ) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(rateCardId: string, rateCardItemId: string, dto: CreateTierPriceDto) {
    try {
      const item = await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);

      if (item.pricing_type !== PricingType.TIER) {
        throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.INVALID_PRICING_TYPE);
      }

      await this.validationService.validateNoOverlappingTier(
        rateCardItemId,
        dto.min_qty,
        dto.max_qty,
      );
      const prisma = await this.getSchemaClient();
      const created = await prisma.tbl_rate_card_tier.create({
        data: {
          fk_rate_card_item_id: rateCardItemId,
          min_qty: dto.min_qty,
          max_qty: dto.max_qty,
          unit_price: dto.unit_price,
        },
      });

      this.logger.log(`Tier created for rate card item: ${rateCardItemId}`);
      return ResponseHelper.success(created, 'Tier price created successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }

  async update(
    rateCardId: string,
    rateCardItemId: string,
    tierId: string,
    dto: UpdateTierPriceDto,
  ) {
    try {
      await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);
      const prisma = await this.getSchemaClient();
      const existing = await prisma.tbl_rate_card_tier.findFirst({
        where: { pk_tier_id: tierId, fk_rate_card_item_id: rateCardItemId },
      });
      if (!existing) {
        throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.TIER_NOT_FOUND);
      }

      const min_qty = dto.min_qty ?? existing.min_qty;
      const max_qty = dto.max_qty ?? existing.max_qty;

      if (dto.min_qty !== undefined || dto.max_qty !== undefined) {
        await this.validationService.validateNoOverlappingTier(
          rateCardItemId,
          min_qty,
          max_qty,
          tierId,
        );
      }

      const updated = await prisma.tbl_rate_card_tier.update({
        where: { pk_tier_id: tierId },
        data: {
          ...(dto.min_qty !== undefined && { min_qty: dto.min_qty }),
          ...(dto.max_qty !== undefined && { max_qty: dto.max_qty }),
          ...(dto.unit_price !== undefined && { unit_price: dto.unit_price }),
        },
      });

      this.logger.log(`Tier updated: ${tierId}`);
      return ResponseHelper.success(updated, 'Tier price updated successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }

  async delete(rateCardId: string, rateCardItemId: string, tierId: string) {
    try {
      await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);
      const prisma = await this.getSchemaClient();
      const existing = await prisma.tbl_rate_card_tier.findFirst({
        where: { pk_tier_id: tierId, fk_rate_card_item_id: rateCardItemId },
      });
      if (!existing) {
        throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.TIER_NOT_FOUND);
      }

      await prisma.tbl_rate_card_tier.delete({ where: { pk_tier_id: tierId } });
      this.logger.log(`Tier deleted: ${tierId}`);
      return ResponseHelper.success(null, 'Tier price deleted successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }
}