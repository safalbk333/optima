import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { CreateMilestonePriceDto } from '../dto/milestone-price/create-milestone-price.dto';
import { UpdateMilestonePriceDto } from '../dto/milestone-price/update-milestone-price.dto';
import { RateCardItemService } from './rate-card-item.service';
import { RateCardValidationService } from './rate-card-validation.service';
import { PricingType } from '../enums/pricing-type.enum';
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';

@Injectable()
export class MilestonePriceService {
  private readonly logger = new Logger(MilestonePriceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rateCardItemService: RateCardItemService,
    private readonly validationService: RateCardValidationService,
  ) {}

  async create(rateCardId: string, rateCardItemId: string, dto: CreateMilestonePriceDto) {
    const item = await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);

    if (item.pricing_type !== PricingType.MILESTONE) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.INVALID_PRICING_TYPE);
    }

    await this.validationService.validateUniqueMilestoneOrder(
      rateCardItemId,
      dto.milestone_order,
    );

    const created = await this.prisma.tbl_rate_card_milestone.create({
      data: {
        fk_rate_card_item_id: rateCardItemId,
        milestone_name: dto.milestone_name,
        milestone_order: dto.milestone_order,
        unit_price: dto.unit_price,
      },
    });

    this.logger.log(`Milestone created for rate card item: ${rateCardItemId}`);
    return created;
  }

  async update(
    rateCardId: string,
    rateCardItemId: string,
    milestoneId: string,
    dto: UpdateMilestonePriceDto,
  ) {
    await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);

    const existing = await this.prisma.tbl_rate_card_milestone.findFirst({
      where: { pk_milestone_id: milestoneId, fk_rate_card_item_id: rateCardItemId },
    });
    if (!existing) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.MILESTONE_NOT_FOUND);
    }

    if (dto.milestone_order !== undefined && dto.milestone_order !== existing.milestone_order) {
      await this.validationService.validateUniqueMilestoneOrder(
        rateCardItemId,
        dto.milestone_order,
        milestoneId,
      );
    }

    const updated = await this.prisma.tbl_rate_card_milestone.update({
      where: { pk_milestone_id: milestoneId },
      data: {
        ...(dto.milestone_name && { milestone_name: dto.milestone_name }),
        ...(dto.milestone_order !== undefined && { milestone_order: dto.milestone_order }),
        ...(dto.unit_price !== undefined && { unit_price: dto.unit_price }),
      },
    });

    this.logger.log(`Milestone updated: ${milestoneId}`);
    return updated;
  }

  async delete(rateCardId: string, rateCardItemId: string, milestoneId: string): Promise<void> {
    await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);

    const existing = await this.prisma.tbl_rate_card_milestone.findFirst({
      where: { pk_milestone_id: milestoneId, fk_rate_card_item_id: rateCardItemId },
    });
    if (!existing) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.MILESTONE_NOT_FOUND);
    }

    await this.prisma.tbl_rate_card_milestone.delete({ where: { pk_milestone_id: milestoneId } });
    this.logger.log(`Milestone deleted: ${milestoneId}`);
  }
}