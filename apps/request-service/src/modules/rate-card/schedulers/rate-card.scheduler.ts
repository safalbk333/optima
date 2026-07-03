import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from "libs/database/prisma-service";
import { VendorItemPriceService } from '../services/vendor-item-price.service';
import { RateCardStatus } from '../enums/rate-card-status.enum';
import { RATE_CARD_CONSTANTS } from '../constants/rate-card.constants';

@Injectable()
export class RateCardScheduler {
  private readonly logger = new Logger(RateCardScheduler.name);
      private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly vendorItemPriceService: VendorItemPriceService,
  ) {}
 private async getSchemaClient() {
        if (!this.schemaClient) {
            this.schemaClient =
                await this.prisma.getClient('public');
        }
        return this.schemaClient;
    }
  /**
   * Runs every day at midnight (Asia/Kolkata).
   * 1. Activates DRAFT cards whose valid_from has arrived (if previously approved/scheduled).
   * 2. Expires ACTIVE cards whose valid_to has passed.
   * 3. Sends 90/60/30-day expiry reminder notifications.
   * 4. Sends expired notifications.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'rate-card-daily-status-job',
    timeZone: RATE_CARD_CONSTANTS.CRON_TIMEZONE,
  })
  async handleDailyStatusUpdate(): Promise<void> {
    this.logger.log('Starting daily rate card status update job');

    try {
      await this.expireOutdatedRateCards();
      await this.sendExpiryReminders();
      this.logger.log('Daily rate card status update job completed successfully');
    } catch (error) {
      this.logger.error(
        `Daily rate card status update job failed: ${error?.message}`,
        error?.stack,
      );
    }
  }

  /**
   * Transitions ACTIVE rate cards whose valid_to date has passed into EXPIRED
   * status, deactivates their vendor-item-price mappings, and notifies the
   * card's creator.
   */
  private async expireOutdatedRateCards(): Promise<void> {
    const now = new Date();
const prisma =
            await this.getSchemaClient();
    const expiringCards = await prisma.tbl_rate_card.findMany({
      where: {
        status: RateCardStatus.ACTIVE,
        is_delete: false,
        valid_to: { lt: now },
      },
    });

    if (expiringCards.length === 0) {
      this.logger.log('No rate cards to expire today');
      return;
    }

    for (const card of expiringCards) {
      await prisma.$transaction(async (tx) => {
        await tx.tbl_rate_card.update({
          where: { pk_rate_card_id: card.pk_rate_card_id },
          data: { status: RateCardStatus.EXPIRED, modified: new Date() },
        });

        await tx.tbl_vendor_item_price.updateMany({
          where: { fk_rate_card_id: card.pk_rate_card_id, is_active: true },
          data: { is_active: false },
        });
      });

      await this.vendorItemPriceService.rebuildForVendor(card.fk_vendor_id);

      await this.createExpiryNotification(
        card,
        RATE_CARD_CONSTANTS.NOTIFICATION_TYPE_CODES.RATE_CARD_EXPIRED,
        `Rate card ${card.rate_card_code} has expired`,
        `The rate card "${card.rate_card_name}" (${card.rate_card_code}) expired on ${card.valid_to.toDateString()} and has been marked EXPIRED.`,
      );

      this.logger.log(`Rate card expired: ${card.pk_rate_card_id} (${card.rate_card_code})`);
    }
  }

  /**
   * Sends reminder notifications for ACTIVE rate cards expiring in exactly
   * 90, 60, or 30 days from today. Uses a date-only comparison window to
   * avoid duplicate sends within the same day.
   */
  private async sendExpiryReminders(): Promise<void> {
    for (const days of RATE_CARD_CONSTANTS.EXPIRY_REMINDER_DAYS) {
      const { startOfDay, endOfDay } = this.getDayWindow(days);
const prisma =
            await this.getSchemaClient();
      const cards = await prisma.tbl_rate_card.findMany({
        where: {
          status: RateCardStatus.ACTIVE,
          is_delete: false,
          valid_to: { gte: startOfDay, lte: endOfDay },
        },
      });

      if (cards.length === 0) {
        continue;
      }

      const typeCode = this.getReminderTypeCode(days);

      for (const card of cards) {
        const alreadySent = await this.reminderAlreadySent(card.pk_rate_card_id, typeCode);
        if (alreadySent) {
          continue;
        }

        await this.createExpiryNotification(
          card,
          typeCode,
          `Rate card ${card.rate_card_code} expires in ${days} days`,
          `The rate card "${card.rate_card_name}" (${card.rate_card_code}) for vendor will expire on ${card.valid_to.toDateString()}, which is ${days} days from today.`,
        );

        this.logger.log(
          `${days}-day expiry reminder sent for rate card: ${card.pk_rate_card_id}`,
        );
      }
    }
  }

  private getReminderTypeCode(days: number): string {
    switch (days) {
      case 90:
        return RATE_CARD_CONSTANTS.NOTIFICATION_TYPE_CODES.RATE_CARD_EXPIRY_90;
      case 60:
        return RATE_CARD_CONSTANTS.NOTIFICATION_TYPE_CODES.RATE_CARD_EXPIRY_60;
      case 30:
        return RATE_CARD_CONSTANTS.NOTIFICATION_TYPE_CODES.RATE_CARD_EXPIRY_30;
      default:
        return RATE_CARD_CONSTANTS.NOTIFICATION_TYPE_CODES.RATE_CARD_EXPIRY_30;
    }
  }

  /**
   * Checks tbl_notification metadata to avoid sending the same reminder type
   * for the same rate card more than once.
   */
  private async reminderAlreadySent(rateCardId: string, typeCode: string): Promise<boolean> {
    const notificationType = await this.getOrCreateNotificationType(typeCode);
const prisma =
            await this.getSchemaClient();
    const existing = await prisma.tbl_notification.findFirst({
      where: {
        fk_notification_type_id: notificationType.pk_notification_type_id,
        is_delete: false,
        metadata: { path: ['fk_rate_card_id'], equals: rateCardId },
      },
    });

    return !!existing;
  }

  /**
   * Creates a notification record for the rate card's creator (fallback to
   * any user with the creator role is out of scope here — we use
   * fk_created_id on the rate card itself).
   */
  private async createExpiryNotification(
    card: { pk_rate_card_id: string; fk_created_id: string | null; rate_card_code: string },
    typeCode: string,
    title: string,
    message: string,
  ): Promise<void> {
    if (!card.fk_created_id) {
      this.logger.warn(
        `Skipping notification for rate card ${card.pk_rate_card_id}: no fk_created_id present`,
      );
      return;
    }

    const notificationType = await this.getOrCreateNotificationType(typeCode);
const prisma =
            await this.getSchemaClient();
    await prisma.tbl_notification.create({
      data: {
        fk_notification_type_id: notificationType.pk_notification_type_id,
        fk_user_id: card.fk_created_id,
        title,
        message,
        channel: 'IN_APP',
        status: 'PENDING',
        metadata: { fk_rate_card_id: card.pk_rate_card_id, rate_card_code: card.rate_card_code },
      },
    });
  }

  /**
   * Ensures the notification type exists (idempotent) since rate card
   * reminder types are specific to this module and may not be pre-seeded.
   */
  private async getOrCreateNotificationType(typeCode: string) {

    const prisma =
            await this.getSchemaClient();
    const existing = await prisma.tbl_notification_type.findFirst({
      where: { type_code: typeCode, is_delete: false },
    });

    if (existing) {
      return existing;
    }

    return prisma.tbl_notification_type.create({
      data: {
        type_code: typeCode,
        type_name: this.humanizeTypeCode(typeCode),
        description: `Auto-created notification type for rate card lifecycle event: ${typeCode}`,
      },
    });
  }

  private humanizeTypeCode(typeCode: string): string {
    return typeCode
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getDayWindow(daysFromNow: number): { startOfDay: Date; endOfDay: Date } {
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);

    const startOfDay = new Date(target);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(target);
    endOfDay.setHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
  }
}