import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CurrencyProperties } from '../../common/properties/currency.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

/**
 * Redis key constants for currency caching.
 * Keys persist indefinitely — reset only on create / update / delete.
 */
const CACHE_KEYS = {
  all: 'currency:all',
  one: (strId: string) => `currency:${strId}`,
};

@Injectable()
export class CurrencyService {
  private readonly logger = new AppLogger(CurrencyService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async create(dto: CreateCurrencyDto) {
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

      // Invalidate the "all" list so next findAll re-fetches fresh data from DB
      await this.cache.del(CACHE_KEYS.all);

      return ResponseHelper.success(objCurrency, 'Currency created successfully');
    } catch (error) {
      this.logger.error(CurrencyProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create currency', error.message);
    }
  }

  // ─── Find All ─────────────────────────────────────────────────────────────

  async findAll() {
    try {
      this.logger.log(CurrencyProperties.service.findAll.start);

      /**
       * Cache-Aside:
       */
      const arrCurrencies = await this.cache.getOrSet(
        CACHE_KEYS.all,
        async () => {
          this.logger.log('[DB Fallback] Fetching all currencies from database');
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_currency.findMany({ where: { is_active: true } });
        },
      );

      this.logger.log(CurrencyProperties.service.findAll.success);
      return ResponseHelper.success(arrCurrencies, 'Currencies fetched successfully');
    } catch (error) {
      this.logger.error(CurrencyProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch currencies', error.message);
    }
  }

  // ─── Find One ─────────────────────────────────────────────────────────────

  async findOne(strId: string) {
    try {
      this.logger.log(`${CurrencyProperties.service.findOne.start}: ${strId}`);

      /**
       * Cache-Aside:
       */
      const objCurrency = await this.cache.getOrSet(
        CACHE_KEYS.one(strId),
        async () => {
          this.logger.log(`[DB Fallback] Fetching currency ${strId} from database`);
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_currency.findUnique({
            where: { pk_currency_id: strId, is_active: true },
          });
        },
      );

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

  async update(strId: string, dto: UpdateCurrencyDto) {
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
       * Cache update strategy (no TTL — persists until next mutation):
       */
      await this.cache.update(
        CACHE_KEYS.one(strId),
        objUpdatedCurrency,
        CACHE_KEYS.all, // invalidate list cache
      );

      return ResponseHelper.success(objUpdatedCurrency, 'Currency updated successfully');
    } catch (error) {
      this.logger.error(`${CurrencyProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
