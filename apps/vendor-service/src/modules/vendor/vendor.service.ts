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

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    try {
      this.logger.log(VendorProperties.service.findAll.start);
      const vendors = await this.prisma.tbl_vendor.findMany();
      this.logger.log(VendorProperties.service.findAll.success);
      return ResponseHelper.success(
        vendors,
        'Vendors fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        VendorProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to fetch vendors',
        error.message,
      );
    }
  }

async findOne(vendor_id: string) {
  const vendor =
    await this.prisma.tbl_vendor.findUnique({
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

async create(createVendorDto: CreateVendorDto) {
  const vendor =
    await this.prisma.tbl_vendor.create({
      data: {
        company_legal_name: createVendorDto.name,
        company_type: createVendorDto.company_type,
        year_of_establishment: new Date(createVendorDto.year_of_establishment),
        office_address: createVendorDto.office_address,
        GST_number: createVendorDto.GST_number,
        PAN_number: createVendorDto.PAN_number,
        MSME_status: createVendorDto.MSME_status,
        nature_of_business: createVendorDto.nature_of_business,
        categories_of_supply: createVendorDto.categories_of_supply,
        contact_person: createVendorDto.contact_person,
        email: createVendorDto.email,
        phone: createVendorDto.phone,
        fk_country_id: createVendorDto.fk_country_id,
        fk_city_id: createVendorDto.fk_city_id,
        is_active: createVendorDto.is_active,
        ...(createVendorDto.fk_created_id && { fk_created_id: createVendorDto.fk_created_id }),
      },
    });

  return ResponseHelper.success(
    vendor,
    'Vendor created successfully',
  );
}
}