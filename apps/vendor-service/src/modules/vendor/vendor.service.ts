import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { VendorProperties } from '../../common/properties/vendor.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { Vendor_status } from '../constant/enum';

@Injectable()
export class VendorService {
  private readonly logger = new AppLogger(VendorService.name);
  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    category_id?: string;
    category_name?: string;
  }) {
    try {
      const prisma =
        await this.getSchemaClient();

      const page =
        !isNaN(Number(payload?.page)) && Number(payload?.page) > 0
          ? Number(payload.page)
          : 1;

      const limit =
        !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0
          ? Number(payload.limit)
          : 10;

      const offset = (page - 1) * limit;
      const whereClause: any = {};

      if (payload.search) {
        whereClause.OR = [
          { company_legal_name: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const where = {
        ...whereClause,
        status: {
          notIn: ['BACKLISTED', 'INACTIVE'],
        },
      };

      const [vendors, total] = await Promise.all([
        prisma.tbl_vendor.findMany({
          where,
          skip: offset,
          take: limit,
        }),
        prisma.tbl_vendor.count({
          where,
        }),
      ]);

      return ResponseHelper.success(
        {
          vendors,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        'Vendors fetched successfully',
      );
    } catch (error) {
      return ResponseHelper.error(
        error.message,
      );
    }
  }

  async findOne(vendor_id: string) {
    try {
      const prisma =
        await this.getSchemaClient();

      const vendor =
        await prisma.tbl_vendor.findUnique({
          where: {
            pk_vendor_id: vendor_id,
          },
        });

      if (!vendor) {
        throw new NotFoundException(
          'Vendor not found',
        );
      }

      return ResponseHelper.success(
        vendor,
        'Vendor fetched successfully',
      );
    } catch (error) {
      return ResponseHelper.error(
        error.message,
      );
    }
  }

  async create(
    createVendorDto: CreateVendorDto,
  ) {
    try {
      const prisma =
        await this.getSchemaClient();

      const existingVendor = await prisma.tbl_vendor.findFirst({
        where: {
          OR: [{
            GST_number: createVendorDto.GST_number,
          },
          {
            PAN_number: createVendorDto.PAN_number,
          },
          ],
        },
      });

      if (existingVendor) {
        if (
          existingVendor.GST_number === createVendorDto.GST_number
        ) {
          throw new NotFoundException(
            'Vendor with this GST Number already exists.',
          );
        }

        if (
          existingVendor.PAN_number === createVendorDto.PAN_number
        ) {
          throw new NotFoundException(
            'Vendor with this PAN Number already exists.',
          );
        }
      }

      const vendor =
        await prisma.tbl_vendor.create({
          data: {
            company_legal_name:
              createVendorDto.company_legal_name,
            trading_name:
              createVendorDto.trading_name,
            company_type:
              createVendorDto.company_type,
            year_of_establishment:
              createVendorDto.year_of_establishment,
            office_address:
              createVendorDto.office_address,
            GST_number:
              createVendorDto.GST_number,
            PAN_number:
              createVendorDto.PAN_number,
            MSME_status:
              createVendorDto.MSME_status,
            bank:
              createVendorDto.bank,
            nature_of_business:
              createVendorDto.nature_of_business,
            categories_of_supply:
              createVendorDto.categories_of_supply,
            contact_person:
              createVendorDto.contact_person,
            email:
              createVendorDto.email,
            phone:
              createVendorDto.phone,
            fk_country_id:
              createVendorDto.fk_country_id,
            fk_city_id:
              createVendorDto.fk_city_id,
            status:
              createVendorDto.status,
          },
        });

      return ResponseHelper.success(
        vendor,
        'Vendor created successfully',
      );
    } catch (error) {
      return ResponseHelper.error(
        error.message,
      );
    }
  }

  async update(vendorId: string, dto: UpdateVendorDto) {
    try {
      this.logger.log(`${VendorProperties.service.update}: ${vendorId}`);
      const prisma = await this.getSchemaClient();

      const vendor = await prisma.tbl_vendor.findUnique({
        where: {
          pk_vendor_id: vendorId,
        },
      });

      if (!vendor) {
        throw new BadRequestException('Vendor not found');
      }

      const vendor_data = await prisma.tbl_vendor.update({
        where: { pk_vendor_id: vendorId },
        data: {
          company_legal_name: dto.company_legal_name,
          trading_name: dto.trading_name,
          company_type: dto.company_type,
          year_of_establishment: dto.year_of_establishment,
          office_address: dto.office_address,
          GST_number: dto.GST_number,
          PAN_number: dto.PAN_number,
          MSME_status: dto.MSME_status,
          bank: dto.bank,
          nature_of_business: dto.nature_of_business,
          categories_of_supply: dto.categories_of_supply,
          contact_person: dto.contact_person,
          email: dto.email,
          phone: dto.phone,
          fk_country_id: dto.fk_country_id,
          fk_city_id: dto.fk_city_id,
          status: dto.status,
          notes: dto.notes
        },
      });

      return ResponseHelper.success(vendor_data, 'Vendor updated successfully');
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      throw error;
    }
  }
}