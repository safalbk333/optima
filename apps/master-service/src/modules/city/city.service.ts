import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CityProperties } from '../../common/properties/city.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:city:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:city:${strId}`,
};

@Injectable()
export class CityService {
  private readonly logger = new AppLogger(CityService.name);
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

  async create(strSchemaId: string, dto: CreateCityDto) {
    try {
      this.logger.log(CityProperties.service.create.start);
      const objPrisma = await this.getSchemaClient();

      const objCity = await objPrisma.tbl_city.create({
        data: {
          city_name: dto.cityName,
          fk_country_id: dto.countryId,
        },
        include: { country: true },
      });

      this.logger.log(`${CityProperties.service.create.success}: ${objCity.pk_city_id}`);
      await this.cache.del(CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objCity, 'City created successfully');
    } catch (error) {
      this.logger.error(CityProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create city', error.message);
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string; countryId?: string }) {
    try {
      this.logger.log(CityProperties.service.findAll.start);

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };
      if (payload?.countryId) whereClause.fk_country_id = payload.countryId;
      if (payload?.search) whereClause.city_name = { contains: payload.search, mode: 'insensitive' };

      const arrCities = await this.cache.getOrSet(
        CACHE_KEYS.all(strSchemaId),
        async () => {
          this.logger.log('[DB Fallback] Fetching all cities from database');
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_city.findMany({
            where: whereClause,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { city_name: 'asc' },
            include: { country: true },
          });
        },
      );

      const objPrisma = await this.getSchemaClient();
      const total = await objPrisma.tbl_city.count({ where: whereClause });

      this.logger.log(CityProperties.service.findAll.success);
      return ResponseHelper.success(
        { cities: arrCities, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Cities fetched successfully',
      );
    } catch (error) {
      this.logger.error(CityProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch cities', error.message);
    }
  }

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${CityProperties.service.findOne.start}: ${strId}`);

      const objCity = await this.cache.getOrSet(
        CACHE_KEYS.one(strSchemaId, strId),
        async () => {
          this.logger.log(`[DB Fallback] Fetching city ${strId} from database`);
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_city.findUnique({
            where: { pk_city_id: strId, is_active: true, is_delete: false },
            include: { country: true },
          });
        },
      );

      if (!objCity) throw new NotFoundException('City not found');

      this.logger.log(`${CityProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objCity, 'City fetched successfully');
    } catch (error) {
      this.logger.error(`${CityProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strSchemaId: string, strId: string, dto: UpdateCityDto) {
    try {
      this.logger.log(`${CityProperties.service.update.start}: ${strId}`);
      const objPrisma = await this.getSchemaClient();

      const objExisting = await objPrisma.tbl_city.findUnique({
        where: { pk_city_id: strId, is_active: true, is_delete: false },
      });

      if (!objExisting) throw new BadRequestException('City not found');

      const objUpdatedCity = await objPrisma.tbl_city.update({
        where: { pk_city_id: strId },
        data: {
          city_name: dto.cityName,
          fk_country_id: dto.countryId,
          is_active: dto.isActive,
          modified: new Date(),
        },
        include: { country: true },
      });

      this.logger.log(`${CityProperties.service.update.success}: ${strId}`);
      await this.cache.update(
        CACHE_KEYS.one(strSchemaId, strId),
        objUpdatedCity,
        CACHE_KEYS.all(strSchemaId),
      );
      return ResponseHelper.success(objUpdatedCity, 'City updated successfully');
    } catch (error) {
      this.logger.error(`${CityProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
