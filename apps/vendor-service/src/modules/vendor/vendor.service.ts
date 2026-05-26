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
        pk_chr_vendor_id: vendor_id,
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
        chr_vendor_name:
          createVendorDto.name,

        chr_vendor_email:
          createVendorDto.email,

        chr_vendor_phone:
          createVendorDto.phone,
      },
    });

  return ResponseHelper.success(
    vendor,
    'Vendor created successfully',
  );
}
}