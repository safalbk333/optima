import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { CreateFixedPriceDto } from '../dto/fixed-price/create-fixed-price.dto';
import { UpdateFixedPriceDto } from '../dto/fixed-price/update-fixed-price.dto';
import { RateCardItemService } from './rate-card-item.service';
import { PricingType } from '../enums/pricing-type.enum';
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';

@Injectable()
export class FixedPriceService {
    private readonly logger = new Logger(FixedPriceService.name);
    private schemaClient: any;

    constructor(
        private readonly prisma: PrismaService,
        private readonly rateCardItemService: RateCardItemService,
    ) { }

    private async getSchemaClient() {
        if (!this.schemaClient) {
            this.schemaClient =
                await this.prisma.getClient('public');
        }
        return this.schemaClient;
    }
    async create(
        rateCardId: string,
        rateCardItemId: string,
        dto: CreateFixedPriceDto,
    ): Promise<{ pk_fixed_price_id: string; unit_price: number }> {
        const item = await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);

        if (item.pricing_type !== PricingType.FIXED) {
            throw new BadRequestException(RATE_CARD_ERROR_MESSAGES.INVALID_PRICING_TYPE);
        }
        const prisma =
            await this.getSchemaClient();

        const existing = await prisma.tbl_rate_card_fixed_price.findUnique({
            where: { fk_rate_card_item_id: rateCardItemId },
        });
        if (existing) {
            throw new BadRequestException('Fixed price already exists for this item. Use update instead.');
        }

        const created = await prisma.tbl_rate_card_fixed_price.create({
            data: {
                fk_rate_card_item_id: rateCardItemId,
                unit_price: dto.unit_price,
            },
        });

        this.logger.log(`Fixed price created for rate card item: ${rateCardItemId}`);
        return created;
    }

    async update(
        rateCardId: string,
        rateCardItemId: string,
        dto: UpdateFixedPriceDto,
    ): Promise<{ pk_fixed_price_id: string; unit_price: number }> {
        await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);
        const prisma =
            await this.getSchemaClient();
        const existing = await prisma.tbl_rate_card_fixed_price.findUnique({
            where: { fk_rate_card_item_id: rateCardItemId },
        });
        if (!existing) {
            throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.FIXED_PRICE_NOT_FOUND);
        }

        const updated = await prisma.tbl_rate_card_fixed_price.update({
            where: { fk_rate_card_item_id: rateCardItemId },
            data: { ...(dto.unit_price !== undefined && { unit_price: dto.unit_price }) },
        });

        this.logger.log(`Fixed price updated for rate card item: ${rateCardItemId}`);
        return updated;
    }

    async delete(rateCardId: string, rateCardItemId: string): Promise<void> {
        await this.rateCardItemService.getEntityOrThrow(rateCardId, rateCardItemId);
        const prisma =
            await this.getSchemaClient();
        const existing = await prisma.tbl_rate_card_fixed_price.findUnique({
            where: { fk_rate_card_item_id: rateCardItemId },
        });
        if (!existing) {
            throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.FIXED_PRICE_NOT_FOUND);
        }

        await prisma.tbl_rate_card_fixed_price.delete({
            where: { fk_rate_card_item_id: rateCardItemId },
        });

        this.logger.log(`Fixed price deleted for rate card item: ${rateCardItemId}`);
    }
}