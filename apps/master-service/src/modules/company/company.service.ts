import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CompanyProperties } from '../../common/properties/company.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class CompanyService {
  private readonly logger = new AppLogger(CompanyService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(dto: CreateCompanyDto) {
    try {
      this.logger.log(CompanyProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      const company = await prisma.tbl_company.create({
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

      this.logger.log(`${CompanyProperties.service.create.success}: ${company.pk_company_id}`);
      return ResponseHelper.success(company, 'Company created successfully');
    } catch (error) {
      this.logger.error(CompanyProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create company', error.message);
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string }) {
    try {
      this.logger.log(CompanyProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

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

      const companies = await prisma.tbl_company.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await prisma.tbl_company.count({ where: whereClause });

      this.logger.log(CompanyProperties.service.findAll.success);
      return ResponseHelper.success(
        {
          companies,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        'Companies fetched successfully',
      );
    } catch (error) {
      this.logger.error(CompanyProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch companies', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${CompanyProperties.service.findOne.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const company = await prisma.tbl_company.findUnique({
        where: { pk_company_id: id, is_active: true, is_delete: false },
      });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      this.logger.log(`${CompanyProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(company, 'Company fetched successfully');
    } catch (error) {
      this.logger.error(`${CompanyProperties.service.findOne.error}: ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, dto: UpdateCompanyDto) {
    try {
      this.logger.log(`${CompanyProperties.service.update.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const existing = await prisma.tbl_company.findUnique({
        where: { pk_company_id: id, is_active: true, is_delete: false },
      });

      if (!existing) {
        throw new BadRequestException('Company not found');
      }

      const company = await prisma.tbl_company.update({
        where: { pk_company_id: id },
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

      this.logger.log(`${CompanyProperties.service.update.success}: ${id}`);
      return ResponseHelper.success(company, 'Company updated successfully');
    } catch (error) {
      this.logger.error(`${CompanyProperties.service.update.error}: ${id}`, error.stack);
      throw error;
    }
  }
}
