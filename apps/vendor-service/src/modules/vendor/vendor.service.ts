import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateVendorDto } from './dto/create-vendor.dto';


@Injectable()
export class VendorService {
  private readonly logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.logger = new Logger(VendorService.name);
  }

  async findAll() {
    try {
      return this.prisma.vendor.findMany();
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(vendor_id: string) {
    try {
      const vendor =
      await this.prisma.vendor.findUnique({
        where: { id:vendor_id },
      });

    if (!vendor) {
      throw new NotFoundException(
        'Vendor not found',
      );
    }
    return vendor;
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async create(createVendorDto: CreateVendorDto) {
    try {
      const vendor = await this.prisma.vendor.create({
        data: {
          vendor_name: createVendorDto.name,
          vendor_email: createVendorDto.email,
          vendor_phone: createVendorDto.phone,
        },
      });
      this.logger.log(
        'VendorService',
        'Vendor created successfully',
        { id: vendor.id },
      );
      return vendor;
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}