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
      const vendors = await this.prisma.vendor.findMany();
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
    try {
      this.logger.log(`${VendorProperties.service.findOne.start}: ${vendor_id}`);
      const vendor =
      await this.prisma.vendor.findUnique({
        where: { id:vendor_id },
      });

    if (!vendor) {
      throw new NotFoundException(
        'Vendor not found',
      );
    }
    this.logger.log(`${VendorProperties.service.findOne.success}: ${vendor_id}`);
    return ResponseHelper.success(
      vendor,
      'Vendor fetched successfully',
    );
    } catch (error) {
      this.logger.error(
        `${VendorProperties.service.findOne.error}: ${vendor_id}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(createVendorDto: CreateVendorDto) {
    try {
      this.logger.log(VendorProperties.service.create.start);
      const vendor = await this.prisma.vendor.create({
        data: {
          vendor_name: createVendorDto.name,
          vendor_email: createVendorDto.email,
          vendor_phone: createVendorDto.phone,
        },
      });
      this.logger.log(`${VendorProperties.service.create.success}: ${vendor.id}`);
      return ResponseHelper.success(
        vendor,
        'Vendor created successfully',
      );
    } catch (error) {
      this.logger.error(
        VendorProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to create vendor',
        error.message,
      );
    }
  }
}