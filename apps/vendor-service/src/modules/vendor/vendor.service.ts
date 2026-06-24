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

    const vendor =
      await prisma.tbl_vendor.create({
        data: {
          vendor_name:
            createVendorDto.name,
          vendor_email:
            createVendorDto.email,
          vendor_phone:
            createVendorDto.phone,
        },
      });

    return ResponseHelper.success(
      vendor,
      'Vendor created successfully',
    );
  }
}