import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { VendorProperties } from '../../common/properties/vendor.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class VendorService {
  private readonly logger = new AppLogger(VendorService.name);
  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async findAll() {
    const prisma =
      await this.getSchemaClient();

    const vendors =
      await prisma.tbl_vendor.findMany();

    return ResponseHelper.success(
      vendors,
      'Vendors fetched successfully',
    );
  }

  async findOne(vendor_id: string) {
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
  }

  async create(
    createVendorDto: CreateVendorDto,
  ) {
    const prisma =
      await this.getSchemaClient();

    const vendors =
      await prisma.tbl_vendor.findMany();
      console.log("qqqqqqqqqq",vendors)

    const vendor =
      await prisma.tbl_vendor.create({
        data: {
          vendor_name:
            createVendorDto.company_legal_name,
          trade_name:
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
  }
}