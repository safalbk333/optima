import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateCountryDto, UpdateCountryDto } from './dto/country.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CountryProperties } from '../../common/properties/country.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:country:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:country:${strId}`,
};

@Injectable()
export class CountryService {
  private readonly logger = new AppLogger(CountryService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  async create(strSchemaId: string, dto: CreateCountryDto) {
    try {
      this.logger.log(CountryProperties.service.create.start);
      const objPrisma = await this.getSchemaClient();

      const objCountry = await objPrisma.tbl_country.create({
        data: {
          country_name: dto.countryName,
          country_code: dto.countryCode,
        },
      });

      this.logger.log(`${CountryProperties.service.create.success}: ${objCountry.pk_country_id}`);
      await this.cache.del(CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objCountry, 'Country created successfully');
    } catch (error) {
      this.logger.error(CountryProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create country', error.message);
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string }) {
    try {
      this.logger.log(CountryProperties.service.findAll.start);

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };
      if (payload?.search) {
        whereClause.OR = [
          { country_name: { contains: payload.search, mode: 'insensitive' } },
          { country_code: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const arrCountries = await this.cache.getOrSet(
        CACHE_KEYS.all(strSchemaId),
        async () => {
          this.logger.log('[DB Fallback] Fetching all countries from database');
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_country.findMany({
            where: whereClause,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { country_name: 'asc' },
          });
        },
      );

      const objPrisma = await this.getSchemaClient();
      const total = await objPrisma.tbl_country.count({ where: whereClause });

      this.logger.log(CountryProperties.service.findAll.success);
      return ResponseHelper.success(
        { countries: arrCountries, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Countries fetched successfully',
      );
    } catch (error) {
      this.logger.error(CountryProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch countries', error.message);
    }
  }

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${CountryProperties.service.findOne.start}: ${strId}`);

      const objCountry = await this.cache.getOrSet(
        CACHE_KEYS.one(strSchemaId, strId),
        async () => {
          this.logger.log(`[DB Fallback] Fetching country ${strId} from database`);
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_country.findUnique({
            where: { pk_country_id: strId, is_active: true, is_delete: false },
            include: { cities: { where: { is_active: true, is_delete: false } } },
          });
        },
      );

      if (!objCountry) throw new NotFoundException('Country not found');

      this.logger.log(`${CountryProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objCountry, 'Country fetched successfully');
    } catch (error) {
      this.logger.error(`${CountryProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strSchemaId: string, strId: string, dto: UpdateCountryDto) {
    try {
      this.logger.log(`${CountryProperties.service.update.start}: ${strId}`);
      const objPrisma = await this.getSchemaClient();

      const objExisting = await objPrisma.tbl_country.findUnique({
        where: { pk_country_id: strId, is_active: true, is_delete: false },
      });

      if (!objExisting) throw new BadRequestException('Country not found');

      const objUpdatedCountry = await objPrisma.tbl_country.update({
        where: { pk_country_id: strId },
        data: {
          country_name: dto.countryName,
          country_code: dto.countryCode,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });

      this.logger.log(`${CountryProperties.service.update.success}: ${strId}`);
      await this.cache.update(
        CACHE_KEYS.one(strSchemaId, strId),
        objUpdatedCountry,
        CACHE_KEYS.all(strSchemaId),
      );
      return ResponseHelper.success(objUpdatedCountry, 'Country updated successfully');
    } catch (error) {
      this.logger.error(`${CountryProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
