import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';

@Injectable()
export class VendorItemPriceService {
  private readonly logger = new Logger(VendorItemPriceService.name);
      private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}
 private async getSchemaClient() {
        if (!this.schemaClient) {
            this.schemaClient =
                await this.prisma.getClient('public');
        }
        return this.schemaClient;
    }
  /**
   * Returns the currently active vendor-item-price mapping, including the
   * full rate card item (with fixed/tier/milestone pricing) so the pricing
   * engine can evaluate it without a second round trip.
   */
  async getActiveMapping(fk_vendor_id: string, fk_item_id: string) {
        const prisma =
            await this.getSchemaClient();
    const mapping = await prisma.tbl_vendor_item_price.findFirst({
      where: {
        fk_vendor_id,
        fk_item_id,
        is_active: true,
      },
      include: {
        rate_card: true,
        rate_card_item: {
          include: {
            fixed_price: true,
            tiers: { orderBy: { min_qty: 'asc' } },
            milestones: { orderBy: { milestone_order: 'asc' } },
          },
        },
      },
    });

    if (!mapping) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.NO_ACTIVE_PRICE);
    }

    return mapping;
  }

  /**
   * Rebuilds active vendor-item-price mappings for a vendor based on
   * whichever rate card items are currently flagged active across all
   * ACTIVE rate cards for that vendor. Used by the scheduler when a rate
   * card transitions status (e.g. expiry), to keep mappings consistent.
   */
  async rebuildForVendor(fk_vendor_id: string): Promise<void> {
        const prisma =
            await this.getSchemaClient();
    await prisma.$transaction(async (tx) => {
      await tx.tbl_vendor_item_price.updateMany({
        where: { fk_vendor_id, is_active: true },
        data: { is_active: false },
      });

      const activeRateCards = await tx.tbl_rate_card.findMany({
        where: { fk_vendor_id, status: 'ACTIVE', is_delete: false },
        include: { items: { where: { is_active: true } } },
        orderBy: { valid_from: 'desc' },
      });

      const seenItems = new Set<string>();

      for (const rateCard of activeRateCards) {
        for (const item of rateCard.items) {
          if (seenItems.has(item.fk_item_id)) continue;
          seenItems.add(item.fk_item_id);

          await tx.tbl_vendor_item_price.upsert({
            where: {
              fk_vendor_id_fk_item_id_is_active: {
                fk_vendor_id,
                fk_item_id: item.fk_item_id,
                is_active: true,
              },
            },
            create: {
              fk_vendor_id,
              fk_item_id: item.fk_item_id,
              fk_rate_card_id: rateCard.pk_rate_card_id,
              fk_rate_card_item_id: item.pk_rate_card_item_id,
              is_active: true,
            },
            update: {
              fk_rate_card_id: rateCard.pk_rate_card_id,
              fk_rate_card_item_id: item.pk_rate_card_item_id,
              is_active: true,
            },
          });
        }
      }
    });

    this.logger.log(`Vendor item price mappings rebuilt for vendor: ${fk_vendor_id}`);
  }

  /**
   * Deactivates all vendor-item-price mappings tied to a specific rate card.
   * Called when a rate card expires or is deactivated.
   */
  async deactivateForRateCard(fk_rate_card_id: string): Promise<void> {
        const prisma =
            await this.getSchemaClient();
    await prisma.tbl_vendor_item_price.updateMany({
      where: { fk_rate_card_id, is_active: true },
      data: { is_active: false },
    });
    this.logger.log(`Vendor item price mappings deactivated for rate card: ${fk_rate_card_id}`);
  }
}