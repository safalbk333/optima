import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CompanyProperties } from '../../common/properties/company.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:company:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:company:${strId}`,
};

@Injectable()
export class CompanyService {
  private readonly logger = new AppLogger(CompanyService.name);
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

  async create(strSchemaId: string, dto: CreateCompanyDto) {
    try {
      this.logger.log(CompanyProperties.service.create.start);
      const objPrisma = await this.getSchemaClient();

      const objCompany = await objPrisma.tbl_company.create({
        data: {
          company_name: dto.companyName,
          company_code: dto.companyCode,
          company_email: dto.companyEmail,
          company_phone: dto.companyPhone,
          company_address: dto.companyAddress,
          city: dto.city,
          state: dto.state,
          country: dto.country,
          postal_code: dto.postalCode,
          website: dto.website,
          tax_number: dto.taxNumber,
          currency: dto.currency,
          logo_url: dto.logoUrl,
        },
      });

      this.logger.log(`${CompanyProperties.service.create.success}: ${objCompany.pk_company_id}`);
      await this.cache.del(CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objCompany, 'Company created successfully');
    } catch (error) {
      this.logger.error(CompanyProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create company', error.message);
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string }) {
    try {
      this.logger.log(CompanyProperties.service.findAll.start);

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };
      if (payload?.search) {
        whereClause.OR = [
          { company_name: { contains: payload.search, mode: 'insensitive' } },
          { company_code: { contains: payload.search, mode: 'insensitive' } },
          { company_email: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const arrCompanies = await this.cache.getOrSet(
        CACHE_KEYS.all(strSchemaId),
        async () => {
          this.logger.log('[DB Fallback] Fetching all companies from database');
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_company.findMany({
            where: whereClause,
            skip: (page - 1) * limit,
            take: limit,
          });
        },
      );

      const objPrisma = await this.getSchemaClient();
      const total = await objPrisma.tbl_company.count({ where: whereClause });

      this.logger.log(CompanyProperties.service.findAll.success);
      return ResponseHelper.success(
        { companies: arrCompanies, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Companies fetched successfully',
      );
    } catch (error) {
      this.logger.error(CompanyProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch companies', error.message);
    }
  }

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${CompanyProperties.service.findOne.start}: ${strId}`);

      const objCompany = await this.cache.getOrSet(
        CACHE_KEYS.one(strSchemaId, strId),
        async () => {
          this.logger.log(`[DB Fallback] Fetching company ${strId} from database`);
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_company.findUnique({
            where: { pk_company_id: strId, is_active: true, is_delete: false },
          });
        },
      );

      if (!objCompany) throw new NotFoundException('Company not found');

      this.logger.log(`${CompanyProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objCompany, 'Company fetched successfully');
    } catch (error) {
      this.logger.error(`${CompanyProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strSchemaId: string, strId: string, dto: UpdateCompanyDto) {
    try {
      this.logger.log(`${CompanyProperties.service.update.start}: ${strId}`);
      const objPrisma = await this.getSchemaClient();

      const objExisting = await objPrisma.tbl_company.findUnique({
        where: { pk_company_id: strId, is_active: true, is_delete: false },
      });

      if (!objExisting) throw new BadRequestException('Company not found');

      const objUpdatedCompany = await objPrisma.tbl_company.update({
        where: { pk_company_id: strId },
        data: {
          company_name: dto.companyName,
          company_code: dto.companyCode,
          company_email: dto.companyEmail,
          company_phone: dto.companyPhone,
          company_address: dto.companyAddress,
          city: dto.city,
          state: dto.state,
          country: dto.country,
          postal_code: dto.postalCode,
          website: dto.website,
          tax_number: dto.taxNumber,
          currency: dto.currency,
          logo_url: dto.logoUrl,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });

      this.logger.log(`${CompanyProperties.service.update.success}: ${strId}`);
      await this.cache.update(
        CACHE_KEYS.one(strSchemaId, strId),
        objUpdatedCompany,
        CACHE_KEYS.all(strSchemaId),
      );
      return ResponseHelper.success(objUpdatedCompany, 'Company updated successfully');
    } catch (error) {
      this.logger.error(`${CompanyProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
