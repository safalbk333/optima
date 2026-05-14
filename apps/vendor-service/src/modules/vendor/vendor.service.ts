import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateVendorDto } from './dto/create-vendor.dto';


@Injectable()
export class VendorService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.vendor.findMany();
  }

  async findOne(vendor_id: string) {
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
  }

  async create(createVendorDto: CreateVendorDto) {
    const vendor = await this.prisma.vendor.create({
      data: {
        vendor_name: createVendorDto.name,
        vendor_email: createVendorDto.email,
        vendor_phone: createVendorDto.phone,
      },
    });
    return vendor;
  }
}