import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { CreateRateCardItemDto } from '../dto/rate-card-item/create-rate-card-item.dto';
import { UpdateRateCardItemDto } from '../dto/rate-card-item/update-rate-card-item.dto';
import { RateCardItemResponseDto } from '../dto/rate-card-item/rate-card-item-response.dto';
import { RateCardValidationService } from './rate-card-validation.service';
import { RateCardService } from './rate-card.service';
import { RATE_CARD_CONSTANTS, RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';
import { BadRequestException } from '@nestjs/common';
import { AppLogger } from '../../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class RateCardItemService {
  private readonly logger = new AppLogger(RateCardItemService.name);
  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: RateCardValidationService,
    private readonly rateCardService: RateCardService,
  ) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async addItem(
    rateCardId: string,
    dto: CreateRateCardItemDto,
    userId: string,
  ) {
    try {
      await this.rateCardService.getEntityOrThrow(rateCardId);
      const prisma = await this.getSchemaClient();
      const item = await prisma.tbl_item.findFirst({
        where: { pk_item_id: dto.fk_item_id, is_active: true },
      });
      if (!item) {
        throw new BadRequestException('Item not found or inactive');
      }

      await this.validationService.validateUniqueItemInRateCard(rateCardId, dto.fk_item_id);

      const created = await prisma.tbl_rate_card_item.create({
        data: {
          fk_rate_card_id: rateCardId,
          fk_item_id: dto.fk_item_id,
          pricing_type: dto.pricing_type,
          currency: dto.currency || RATE_CARD_CONSTANTS.DEFAULT_CURRENCY,
          fk_created_id: userId,
        },
        include: { item: { select: { item_name: true, item_code: true } } },
      });

      this.logger.log(
        `Item ${dto.fk_item_id} added to rate card ${rateCardId} with pricing type ${dto.pricing_type}`,
      );

      return ResponseHelper.success(this.toResponseDto(created), 'Rate card item added successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }

  async updateItem(
    rateCardId: string,
    itemId: string,
    dto: UpdateRateCardItemDto,
    userId: string,
  ) {
    try {
      await this.getEntityOrThrow(rateCardId, itemId);
      const prisma = await this.getSchemaClient();
      const updated = await prisma.tbl_rate_card_item.update({
        where: { pk_rate_card_item_id: itemId },
        data: {
          ...(dto.currency && { currency: dto.currency }),
          ...(dto.is_active !== undefined && { is_active: dto.is_active }),
          modified: new Date(),
          fk_modified_id: userId,
        },
        include: { item: { select: { item_name: true, item_code: true } } },
      });

      this.logger.log(`Rate card item updated: ${itemId}`);
      return ResponseHelper.success(this.toResponseDto(updated), 'Rate card item updated successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }

  async deleteItem(rateCardId: string, itemId: string) {
    try {
      await this.getEntityOrThrow(rateCardId, itemId);
      const prisma = await this.getSchemaClient();
      await prisma.tbl_rate_card_item.delete({
        where: { pk_rate_card_item_id: itemId },
      });

      this.logger.log(`Rate card item deleted: ${itemId}`);
      return ResponseHelper.success(null, 'Rate card item deleted successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }

  async listItems(rateCardId: string) {
    try {
      await this.rateCardService.getEntityOrThrow(rateCardId);
      const prisma = await this.getSchemaClient();
      const items = await prisma.tbl_rate_card_item.findMany({
        where: { fk_rate_card_id: rateCardId },
        include: {
          item: { select: { item_name: true, item_code: true } },
          fixed_price: true,
          tiers: { orderBy: { min_qty: 'asc' } },
          milestones: { orderBy: { milestone_order: 'asc' } },
        },
        orderBy: { created: 'asc' },
      });

      return ResponseHelper.success(items.map((item) => this.toResponseDto(item)), 'Rate card items fetched successfully');
    } catch (error: any) {
      this.logger.error(error.stack || error.message);
      return ResponseHelper.error(error.message);
    }
  }

  async getEntityOrThrow(rateCardId: string, itemId: string) {
    const prisma = await this.getSchemaClient();
    const item = await prisma.tbl_rate_card_item.findFirst({
      where: { pk_rate_card_item_id: itemId, fk_rate_card_id: rateCardId },
    });
    if (!item) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.RATE_CARD_ITEM_NOT_FOUND);
    }
    return item;
  }

  toResponseDto(item: any): RateCardItemResponseDto {
    return new RateCardItemResponseDto({
      pk_rate_card_item_id: item.pk_rate_card_item_id,
      fk_rate_card_id: item.fk_rate_card_id,
      fk_item_id: item.fk_item_id,
      item_name: item.item?.item_name,
      item_code: item.item?.item_code,
      pricing_type: item.pricing_type,
      currency: item.currency,
      is_active: item.is_active,
      fixed_price: item.fixed_price
        ? { unit_price: item.fixed_price.unit_price }
        : undefined,
      tiers: item.tiers?.map((t: any) => ({
        min_qty: t.min_qty,
        max_qty: t.max_qty,
        unit_price: t.unit_price,
      })),
      milestones: item.milestones?.map((m: any) => ({
        milestone_name: m.milestone_name,
        milestone_order: m.milestone_order,
        unit_price: m.unit_price,
      })),
    });
  }
}