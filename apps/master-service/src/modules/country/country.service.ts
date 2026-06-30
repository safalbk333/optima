import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateCountryDto, UpdateCountryDto } from './dto/country.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CountryProperties } from '../../common/properties/country.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class CountryService {
  private readonly logger = new AppLogger(CountryService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(dto: CreateCountryDto) {
    try {
      this.logger.log(CountryProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      const country = await prisma.tbl_country.create({
        data: {
          country_name: dto.countryName,
          country_code: dto.countryCode,
        },
      });

      this.logger.log(`${CountryProperties.service.create.success}: ${country.pk_country_id}`);
      return ResponseHelper.success(country, 'Country created successfully');
    } catch (error) {
      this.logger.error(CountryProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create country', error.message);
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string }) {
    try {
      this.logger.log(CountryProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };

      if (payload?.search) {
        whereClause.OR = [
          { country_name: { contains: payload.search, mode: 'insensitive' } },
          { country_code: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const countries = await prisma.tbl_country.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { country_name: 'asc' },
      });

      const total = await prisma.tbl_country.count({ where: whereClause });

      this.logger.log(CountryProperties.service.findAll.success);
      return ResponseHelper.success(
        {
          countries,
          pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        },
        'Countries fetched successfully',
      );
    } catch (error) {
      this.logger.error(CountryProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch countries', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${CountryProperties.service.findOne.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const country = await prisma.tbl_country.findUnique({
        where: { pk_country_id: id, is_active: true, is_delete: false },
        include: { cities: { where: { is_active: true, is_delete: false } } },
      });

      if (!country) {
        throw new NotFoundException('Country not found');
      }

      this.logger.log(`${CountryProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(country, 'Country fetched successfully');
    } catch (error) {
      this.logger.error(`${CountryProperties.service.findOne.error}: ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, dto: UpdateCountryDto) {
    try {
      this.logger.log(`${CountryProperties.service.update.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const existing = await prisma.tbl_country.findUnique({
        where: { pk_country_id: id, is_active: true, is_delete: false },
      });

      if (!existing) {
        throw new BadRequestException('Country not found');
      }

      const country = await prisma.tbl_country.update({
        where: { pk_country_id: id },
        data: {
          country_name: dto.countryName,
          country_code: dto.countryCode,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });

      this.logger.log(`${CountryProperties.service.update.success}: ${id}`);
      return ResponseHelper.success(country, 'Country updated successfully');
    } catch (error) {
      this.logger.error(`${CountryProperties.service.update.error}: ${id}`, error.stack);
      throw error;
    }
  }
}
