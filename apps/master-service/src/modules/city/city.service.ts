import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CityProperties } from '../../common/properties/city.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class CityService {
  private readonly logger = new AppLogger(CityService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(dto: CreateCityDto) {
    try {
      this.logger.log(CityProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      const city = await prisma.tbl_city.create({
        data: {
          city_name: dto.cityName,
          fk_country_id: dto.countryId,
        },
        include: { country: true },
      });

      this.logger.log(`${CityProperties.service.create.success}: ${city.pk_city_id}`);
      return ResponseHelper.success(city, 'City created successfully');
    } catch (error) {
      this.logger.error(CityProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create city', error.message);
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string; countryId?: string }) {
    try {
      this.logger.log(CityProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };

      if (payload?.countryId) {
        whereClause.fk_country_id = payload.countryId;
      }

      if (payload?.search) {
        whereClause.city_name = { contains: payload.search, mode: 'insensitive' };
      }

      const cities = await prisma.tbl_city.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { city_name: 'asc' },
        include: { country: true },
      });

      const total = await prisma.tbl_city.count({ where: whereClause });

      this.logger.log(CityProperties.service.findAll.success);
      return ResponseHelper.success(
        {
          cities,
          pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        },
        'Cities fetched successfully',
      );
    } catch (error) {
      this.logger.error(CityProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch cities', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${CityProperties.service.findOne.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const city = await prisma.tbl_city.findUnique({
        where: { pk_city_id: id, is_active: true, is_delete: false },
        include: { country: true },
      });

      if (!city) {
        throw new NotFoundException('City not found');
      }

      this.logger.log(`${CityProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(city, 'City fetched successfully');
    } catch (error) {
      this.logger.error(`${CityProperties.service.findOne.error}: ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, dto: UpdateCityDto) {
    try {
      this.logger.log(`${CityProperties.service.update.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const existing = await prisma.tbl_city.findUnique({
        where: { pk_city_id: id, is_active: true, is_delete: false },
      });

      if (!existing) {
        throw new BadRequestException('City not found');
      }

      const city = await prisma.tbl_city.update({
        where: { pk_city_id: id },
        data: {
          city_name: dto.cityName,
          fk_country_id: dto.countryId,
          is_active: dto.isActive,
          modified: new Date(),
        },
        include: { country: true },
      });

      this.logger.log(`${CityProperties.service.update.success}: ${id}`);
      return ResponseHelper.success(city, 'City updated successfully');
    } catch (error) {
      this.logger.error(`${CityProperties.service.update.error}: ${id}`, error.stack);
      throw error;
    }
  }
}
