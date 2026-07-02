import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { RateCardStatus } from '../enums/rate-card-status.enum';
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';

@Injectable()
export class RateCardValidationService {
      private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}
 private async getSchemaClient() {
        if (!this.schemaClient) {
            this.schemaClient =
                await this.prisma.getClient('public');
        }
        return this.schemaClient;
    }
  async validateUniqueCode(rate_card_code: string, excludeId?: string): Promise<void> {
    const prisma =
            await this.getSchemaClient();
    const existing = await prisma.tbl_rate_card.findFirst({
      where: {
        rate_card_code,
        is_delete: false,
        ...(excludeId ? { NOT: { pk_rate_card_id: excludeId } } : {}),
      },
    });
    if (existing) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.DUPLICATE_CODE);
    }
  }

  validateDateRange(valid_from: Date, valid_to: Date): void {
    if (new Date(valid_from).getTime() >= new Date(valid_to).getTime()) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.INVALID_DATE_RANGE);
    }
  }

  async validateNoOverlappingActiveCard(
    fk_vendor_id: string,
    valid_from: Date,
    valid_to: Date,
    excludeId?: string,
  ): Promise<void> {
    const prisma =
            await this.getSchemaClient();
    const overlapping = await prisma.tbl_rate_card.findFirst({
      where: {
        fk_vendor_id,
        is_delete: false,
        status: { in: [RateCardStatus.ACTIVE, RateCardStatus.DRAFT] },
        ...(excludeId ? { NOT: { pk_rate_card_id: excludeId } } : {}),
        AND: [
          { valid_from: { lte: valid_to } },
          { valid_to: { gte: valid_from } },
        ],
      },
    });
    if (overlapping) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.MULTIPLE_ACTIVE_CARDS);
    }
  }

  validateNotExpiredForActivation(valid_to: Date): void {
    if (new Date(valid_to).getTime() < Date.now()) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.CANNOT_ACTIVATE_EXPIRED);
    }
  }

  validateNotActiveForDelete(status: string): void {
    if (status === RateCardStatus.ACTIVE) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.CANNOT_DELETE_ACTIVE);
    }
  }

  async validateUniqueItemInRateCard(
    fk_rate_card_id: string,
    fk_item_id: string,
    excludeId?: string,
  ): Promise<void> {
    const prisma =
            await this.getSchemaClient();
    const existing = await prisma.tbl_rate_card_item.findFirst({
      where: {
        fk_rate_card_id,
        fk_item_id,
        ...(excludeId ? { NOT: { pk_rate_card_item_id: excludeId } } : {}),
      },
    });
    if (existing) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.DUPLICATE_ITEM);
    }
  }

  async validateNoOverlappingTier(
    fk_rate_card_item_id: string,
    min_qty: number,
    max_qty: number,
    excludeId?: string,
  ): Promise<void> {
    if (min_qty > max_qty) {
      throw new BadRequestException('min_qty cannot be greater than max_qty');
    }
    const prisma =
            await this.getSchemaClient();
    const overlapping = await prisma.tbl_rate_card_tier.findFirst({
      where: {
        fk_rate_card_item_id,
        ...(excludeId ? { NOT: { pk_tier_id: excludeId } } : {}),
        AND: [{ min_qty: { lte: max_qty } }, { max_qty: { gte: min_qty } }],
      },
    });
    if (overlapping) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.OVERLAPPING_TIER);
    }
  }

  async validateUniqueMilestoneOrder(
    fk_rate_card_item_id: string,
    milestone_order: number,
    excludeId?: string,
  ): Promise<void> {
    const prisma =
            await this.getSchemaClient();
    const existing = await prisma.tbl_rate_card_milestone.findFirst({
      where: {
        fk_rate_card_item_id,
        milestone_order,
        ...(excludeId ? { NOT: { pk_milestone_id: excludeId } } : {}),
      },
    });
    if (existing) {
      throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.DUPLICATE_MILESTONE_ORDER);
    }
  }
}