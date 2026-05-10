import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma/prisma-service';


@Injectable()
export class VendorService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.vendor.findMany();
  }

  async findOne(id: string) {
    const vendor =
      await this.prisma.vendor.findUnique({
        where: { id },
      });

    if (!vendor) {
      throw new NotFoundException(
        'Vendor not found',
      );
    }

    return vendor;
  }

  async create(data: {
    name: string;
    email: string;
  }) {
    return this.prisma.vendor.create({
      data,
    });
  }
}