import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from "libs/database/prisma-service";
import { CreateRateCardDto } from '../dto/rate-card/create-rate-card.dto';
import { UpdateRateCardDto } from '../dto/rate-card/update-rate-card.dto';
import { RateCardQueryDto } from '../dto/rate-card/rate-card-query.dto';
import { CloneRateCardDto } from '../dto/rate-card/clone-rate-card.dto';
import { RateCardResponseDto } from '../dto/rate-card/rate-card-response.dto';
import { RateCardStatus } from '../enums/rate-card-status.enum';
import { RateCardValidationService } from './rate-card-validation.service';
import { RATE_CARD_ERROR_MESSAGES } from '../constants/rate-card.constants';

@Injectable()
export class RateCardService {
  private readonly logger = new Logger(RateCardService.name);
      private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: RateCardValidationService,
  ) {}
 private async getSchemaClient() {
        if (!this.schemaClient) {
            this.schemaClient =
                await this.prisma.getClient('public');
        }
        return this.schemaClient;
    }
  async create(dto: CreateRateCardDto, userId: string): Promise<RateCardResponseDto> {
    this.logger.log(`Creating rate card with code: ${dto.rate_card_code}`);

    const valid_from = new Date(dto.valid_from);
    const valid_to = new Date(dto.valid_to);

    await this.validationService.validateUniqueCode(dto.rate_card_code);
    this.validationService.validateDateRange(valid_from, valid_to);
    const prisma =
            await this.getSchemaClient();
    const vendor = await prisma.tbl_vendor.findFirst({
      where: { pk_vendor_id: dto.fk_vendor_id, is_delete: false },
    });
    if (!vendor) {
      throw new BadRequestException('Vendor not found');
    }

    const rateCard = await prisma.tbl_rate_card.create({
      data: {
        rate_card_code: dto.rate_card_code,
        rate_card_name: dto.rate_card_name,
        fk_vendor_id: dto.fk_vendor_id,
        valid_from,
        valid_to,
        remarks: dto.remarks,
        status: RateCardStatus.DRAFT,
        fk_created_id: userId,
      },
    });

    this.logger.log(`Rate card created with id: ${rateCard.pk_rate_card_id}`);
    return this.toResponseDto(rateCard);
  }

  async findAll(query: RateCardQueryDto): Promise<{ data: RateCardResponseDto[]; total: number; page: number; limit: number }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = { is_delete: false };
    if (query.status) where.status = query.status;
    if (query.fk_vendor_id) where.fk_vendor_id = query.fk_vendor_id;
    if (query.search) {
      where.OR = [
        { rate_card_code: { contains: query.search, mode: 'insensitive' } },
        { rate_card_name: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const prisma =
            await this.getSchemaClient();
    const [items, total] = await prisma.$transaction([
      prisma.tbl_rate_card.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created: 'desc' },
        include: {
          vendor: { select: { company_legal_name: true } },
          items: { select: { pk_rate_card_item_id: true } },
        },
      }),
      prisma.tbl_rate_card.count({ where }),
    ]);

    return {
      data: items.map((rc) =>
        this.toResponseDto(rc, rc.vendor?.company_legal_name, rc.items?.length),
      ),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<RateCardResponseDto> {
        const prisma =
            await this.getSchemaClient();
    const rateCard = await prisma.tbl_rate_card.findFirst({
      where: { pk_rate_card_id: id, is_delete: false },
      include: {
        vendor: { select: { company_legal_name: true } },
        items: { select: { pk_rate_card_item_id: true } },
      },
    });

    if (!rateCard) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.RATE_CARD_NOT_FOUND);
    }

    return this.toResponseDto(rateCard, rateCard.vendor?.company_legal_name, rateCard.items?.length);
  }

  async getEntityOrThrow(id: string) {
        const prisma =
            await this.getSchemaClient();
    const rateCard = await prisma.tbl_rate_card.findFirst({
      where: { pk_rate_card_id: id, is_delete: false },
    });
    if (!rateCard) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.RATE_CARD_NOT_FOUND);
    }
    return rateCard;
  }

  async update(id: string, dto: UpdateRateCardDto, userId: string): Promise<RateCardResponseDto> {
    const existing = await this.getEntityOrThrow(id);

    const valid_from = dto.valid_from ? new Date(dto.valid_from) : existing.valid_from;
    const valid_to = dto.valid_to ? new Date(dto.valid_to) : existing.valid_to;

    this.validationService.validateDateRange(valid_from, valid_to);

    if (dto.fk_vendor_id || dto.valid_from || dto.valid_to) {
      await this.validationService.validateNoOverlappingActiveCard(
        dto.fk_vendor_id || existing.fk_vendor_id,
        valid_from,
        valid_to,
        id,
      );
    }
    const prisma =
            await this.getSchemaClient();
    const updated = await prisma.tbl_rate_card.update({
      where: { pk_rate_card_id: id },
      data: {
        ...(dto.fk_vendor_id && { fk_vendor_id: dto.fk_vendor_id }),
        ...(dto.rate_card_name && { rate_card_name: dto.rate_card_name }),
        ...(dto.valid_from && { valid_from }),
        ...(dto.valid_to && { valid_to }),
        ...(dto.remarks !== undefined && { remarks: dto.remarks }),
        modified: new Date(),
        fk_modified_id: userId,
      },
    });

    this.logger.log(`Rate card updated: ${id}`);
    return this.toResponseDto(updated);
  }

  async remove(id: string, userId: string): Promise<void> {
    const existing = await this.getEntityOrThrow(id);
    this.validationService.validateNotActiveForDelete(existing.status);
    const prisma =
            await this.getSchemaClient();
    await prisma.tbl_rate_card.update({
      where: { pk_rate_card_id: id },
      data: {
        is_delete: true,
        modified: new Date(),
        fk_modified_id: userId,
      },
    });

    this.logger.log(`Rate card soft-deleted: ${id}`);
  }

  async activate(id: string, userId: string): Promise<RateCardResponseDto> {
    const existing = await this.getEntityOrThrow(id);
    this.validationService.validateNotExpiredForActivation(existing.valid_to);

    await this.validationService.validateNoOverlappingActiveCard(
      existing.fk_vendor_id,
      existing.valid_from,
      existing.valid_to,
      id,
    );

    const newStatus =
      new Date(existing.valid_from).getTime() > Date.now()
        ? RateCardStatus.ACTIVE
        : RateCardStatus.ACTIVE;
    const prisma =
            await this.getSchemaClient();
    const updated = await prisma.tbl_rate_card.update({
      where: { pk_rate_card_id: id },
      data: {
        status: newStatus,
        modified: new Date(),
        fk_modified_id: userId,
      },
    });

    await this.refreshVendorItemPricesForRateCard(id);

    this.logger.log(`Rate card activated: ${id}`);
    return this.toResponseDto(updated);
  }

  async deactivate(id: string, userId: string): Promise<RateCardResponseDto> {
    await this.getEntityOrThrow(id);
    const prisma =
            await this.getSchemaClient();
    const updated = await prisma.tbl_rate_card.update({
      where: { pk_rate_card_id: id },
      data: {
        status: RateCardStatus.INACTIVE,
        modified: new Date(),
        fk_modified_id: userId,
      },
    });

    await prisma.tbl_vendor_item_price.updateMany({
      where: { fk_rate_card_id: id, is_active: true },
      data: { is_active: false },
    });

    this.logger.log(`Rate card deactivated: ${id}`);
    return this.toResponseDto(updated);
  }

  async clone(id: string, dto: CloneRateCardDto, userId: string): Promise<RateCardResponseDto> {
        const prisma =
            await this.getSchemaClient();
    const source = await prisma.tbl_rate_card.findFirst({
      where: { pk_rate_card_id: id, is_delete: false },
      include: {
        items: {
          include: { fixed_price: true, tiers: true, milestones: true },
        },
      },
    });

    if (!source) {
      throw new NotFoundException(RATE_CARD_ERROR_MESSAGES.RATE_CARD_NOT_FOUND);
    }

    const valid_from = new Date(dto.valid_from);
    const valid_to = new Date(dto.valid_to);

    await this.validationService.validateUniqueCode(dto.rate_card_code);
    this.validationService.validateDateRange(valid_from, valid_to);

    const cloned = await prisma.$transaction(async (tx) => {
      const newRateCard = await tx.tbl_rate_card.create({
        data: {
          rate_card_code: dto.rate_card_code,
          rate_card_name: dto.rate_card_name,
          fk_vendor_id: source.fk_vendor_id,
          valid_from,
          valid_to,
          remarks: source.remarks,
          status: RateCardStatus.DRAFT,
          fk_created_id: userId,
        },
      });

      for (const item of source.items) {
        const newItem = await tx.tbl_rate_card_item.create({
          data: {
            fk_rate_card_id: newRateCard.pk_rate_card_id,
            fk_item_id: item.fk_item_id,
            pricing_type: item.pricing_type,
            currency: item.currency,
            fk_created_id: userId,
          },
        });

        if (item.fixed_price) {
          await tx.tbl_rate_card_fixed_price.create({
            data: {
              fk_rate_card_item_id: newItem.pk_rate_card_item_id,
              unit_price: item.fixed_price.unit_price,
            },
          });
        }

        if (item.tiers?.length) {
          await tx.tbl_rate_card_tier.createMany({
            data: item.tiers.map((tier) => ({
              fk_rate_card_item_id: newItem.pk_rate_card_item_id,
              min_qty: tier.min_qty,
              max_qty: tier.max_qty,
              unit_price: tier.unit_price,
            })),
          });
        }

        if (item.milestones?.length) {
          await tx.tbl_rate_card_milestone.createMany({
            data: item.milestones.map((m) => ({
              fk_rate_card_item_id: newItem.pk_rate_card_item_id,
              milestone_name: m.milestone_name,
              milestone_order: m.milestone_order,
              unit_price: m.unit_price,
            })),
          });
        }
      }

      return newRateCard;
    });

    this.logger.log(`Rate card cloned from ${id} to ${cloned.pk_rate_card_id}`);
    return this.toResponseDto(cloned);
  }

  async getActive(): Promise<RateCardResponseDto[]> {
        const prisma =
            await this.getSchemaClient();
    const items = await prisma.tbl_rate_card.findMany({
      where: { status: RateCardStatus.ACTIVE, is_delete: false },
      include: { vendor: { select: { company_legal_name: true } } },
      orderBy: { valid_to: 'asc' },
    });
    return items.map((rc) => this.toResponseDto(rc, rc.vendor?.company_legal_name));
  }

  async getExpired(): Promise<RateCardResponseDto[]> {
        const prisma =
            await this.getSchemaClient();
    const items = await prisma.tbl_rate_card.findMany({
      where: { status: RateCardStatus.EXPIRED, is_delete: false },
      include: { vendor: { select: { company_legal_name: true } } },
      orderBy: { valid_to: 'desc' },
    });
    return items.map((rc) => this.toResponseDto(rc, rc.vendor?.company_legal_name));
  }

  async getExpiring(days: number): Promise<RateCardResponseDto[]> {
    const now = new Date();
    const threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const prisma =
            await this.getSchemaClient();
    const items = await prisma.tbl_rate_card.findMany({
      where: {
        status: RateCardStatus.ACTIVE,
        is_delete: false,
        valid_to: { gte: now, lte: threshold },
      },
      include: { vendor: { select: { company_legal_name: true } } },
      orderBy: { valid_to: 'asc' },
    });
    return items.map((rc) => this.toResponseDto(rc, rc.vendor?.company_legal_name));
  }

  private async refreshVendorItemPricesForRateCard(rateCardId: string): Promise<void> {
        const prisma =
            await this.getSchemaClient();
    const rateCard = await prisma.tbl_rate_card.findUnique({
      where: { pk_rate_card_id: rateCardId },
      include: { items: true },
    });
    if (!rateCard) return;

    await prisma.$transaction(async (tx) => {
      await tx.tbl_vendor_item_price.updateMany({
        where: { fk_vendor_id: rateCard.fk_vendor_id, is_active: true },
        data: { is_active: false },
      });

      for (const item of rateCard.items) {
        if (!item.is_active) continue;
        await tx.tbl_vendor_item_price.upsert({
          where: {
            fk_vendor_id_fk_item_id_is_active: {
              fk_vendor_id: rateCard.fk_vendor_id,
              fk_item_id: item.fk_item_id,
              is_active: true,
            },
          },
          create: {
            fk_vendor_id: rateCard.fk_vendor_id,
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
    });
  }

  toResponseDto(rateCard: any, vendor_name?: string, item_count?: number): RateCardResponseDto {
    return new RateCardResponseDto({
      pk_rate_card_id: rateCard.pk_rate_card_id,
      rate_card_code: rateCard.rate_card_code,
      rate_card_name: rateCard.rate_card_name,
      fk_vendor_id: rateCard.fk_vendor_id,
      vendor_name,
      valid_from: rateCard.valid_from,
      valid_to: rateCard.valid_to,
      status: rateCard.status,
      remarks: rateCard.remarks,
      created: rateCard.created,
      modified: rateCard.modified,
      item_count,
    });
  }
}