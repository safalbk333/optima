import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CurrencyProperties } from '../../common/properties/currency.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

/**
 * Redis key builders for currency caching.
 *
 * Pattern: {schemaId}:currency:all          → tenant-scoped list cache
 *          {schemaId}:currency:{currencyId}  → tenant-scoped single-record cache
 *
 * Keys have NO expiry — they persist until explicitly invalidated on
 * create / update / delete.
 */
const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:currency:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:currency:${strId}`,
};

@Injectable()
export class CurrencyService {
  private readonly logger = new AppLogger(CurrencyService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    // private readonly cache: CacheService,
  ) { }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async create(strSchemaId: string, dto: CreateCurrencyDto) {
    try {
      this.logger.log(CurrencyProperties.service.create.start);

      const objPrisma = await this.getSchemaClient();

      const objCurrency = await objPrisma.tbl_currency.create({
        data: {
          currency_name: dto.currencyName,
          currency_code: dto.currencyCode,
          symbol: dto.symbol,
          description: dto.description,
        },
      });

      const strCreatedId: string = objCurrency.pk_currency_id;
      this.logger.log(`${CurrencyProperties.service.create.success}: ${strCreatedId}`);

      // Invalidate the tenant-scoped "all" list so next findAll re-fetches from DB
      // await this.cache.del(CACHE_KEYS.all(strSchemaId));

      return ResponseHelper.success(objCurrency, 'Currency created successfully');
    } catch (error) {
      this.logger.error(CurrencyProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create currency', error.message);
    }
  }

  // ─── Find All ─────────────────────────────────────────────────────────────

  async findAll(strSchemaId: string) {
    try {
      this.logger.log(CurrencyProperties.service.findAll.start);

      /**
       * Cache-Aside:
       *  1. Check Redis for '{strSchemaId}:currency:all'
       *  2. On miss → run DB callback, store result (no expiry), return it
       *  3. If Redis is down → callback runs directly, no error thrown
       */
      const objPrisma = await this.getSchemaClient();

      const arrCurrencies = await objPrisma.tbl_currency.findMany({
        where: {
          is_active: true,
        },
      });

      this.logger.log(CurrencyProperties.service.findAll.success);
      return ResponseHelper.success(arrCurrencies, 'Currencies fetched successfully');
    } catch (error) {
      this.logger.error(CurrencyProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch currencies', error.message);
    }
  }

  // ─── Find One ─────────────────────────────────────────────────────────────

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${CurrencyProperties.service.findOne.start}: ${strId}`);

      /**
       * Cache-Aside:
       *  1. Check Redis for '{strSchemaId}:currency:{strId}'
       *  2. On miss → fetch from DB, store in cache (no expiry)
       *  3. If DB returns null → throw NotFoundException
       */
      const objPrisma = await this.getSchemaClient();

      const objCurrency = await objPrisma.tbl_currency.findFirst({
        where: {
          pk_currency_id: strId,
          is_active: true,
        },
      });

      if (!objCurrency) {
        throw new NotFoundException('Currency not found');
      }

      this.logger.log(`${CurrencyProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objCurrency, 'Currency fetched successfully');
    } catch (error) {
      this.logger.error(`${CurrencyProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update(strSchemaId: string, strId: string, dto: UpdateCurrencyDto) {
    try {
      this.logger.log(`${CurrencyProperties.service.update.start}: ${strId}`);

      const objPrisma = await this.getSchemaClient();

      const objExisting = await objPrisma.tbl_currency.findUnique({
        where: { pk_currency_id: strId, is_active: true },
      });

      if (!objExisting) {
        throw new BadRequestException('Currency not found');
      }

      const blnIsActive: boolean = dto.isActive ?? objExisting.is_active;

      const objUpdatedCurrency = await objPrisma.tbl_currency.update({
        where: { pk_currency_id: strId },
        data: {
          currency_name: dto.currencyName,
          currency_code: dto.currencyCode,
          symbol: dto.symbol,
          description: dto.description,
          is_active: blnIsActive,
          modified: new Date(),
        },
      });

      this.logger.log(`${CurrencyProperties.service.update.success}: ${strId}`);

      /**
       * Cache update strategy — both keys are tenant-scoped (no TTL):
       *  - Overwrite '{strSchemaId}:currency:{strId}' with the fresh record
       *  - Invalidate '{strSchemaId}:currency:all' so next findAll re-fetches
       */
      // await this.cache.update(
      //   CACHE_KEYS.one(strSchemaId, strId),
      //   objUpdatedCurrency,
      //   CACHE_KEYS.all(strSchemaId), // invalidate tenant list cache
      // );

      return ResponseHelper.success(objUpdatedCurrency, 'Currency updated successfully');
    } catch (error) {
      this.logger.error(`${CurrencyProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
