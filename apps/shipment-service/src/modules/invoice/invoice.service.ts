import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoiceService {
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

  async create(
    dto: CreateInvoiceDto,
    userId: string,
  ) {
    try {
      const prisma =
        await this.getSchemaClient();

      if (typeof (this.prisma as any).tbl_invoice === 'undefined') {
        throw new Error('Prisma client missing model `tbl_invoice`');
      }

      return prisma.tbl_invoice.create({
        data: {
          ...dto,
          fk_created_id: userId,
        },
        include: {
          vendor: true,
          request: true,
          purchase_order: true,
          goods_receipt: true,
        },
      });
    } catch (error) {
      console.error('InvoiceService.create error:', error?.message ?? error);
      throw error;
    }
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
    search?: string,
  ) {
    const prisma =
      await this.getSchemaClient();

    const where: any = {};

    if (search && search.trim()) {
      where.OR = [
        {
          invoice_number: {
            contains: search.trim(),
            mode: 'insensitive',
          },
        },
        {
          vendor: {
            vendor_name: {
              contains: search.trim(),
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    try {
      if (typeof (this.prisma as any).tbl_invoice === 'undefined') {
        throw new Error('Prisma client missing model `tbl_invoice`');
      }

      const [data, total] = await Promise.all([
        prisma.tbl_invoice.findMany({
          where,
          include: {
            vendor: true,
            request: true,
            purchase_order: true,
            goods_receipt: true,
          },
          orderBy: {
            created: 'desc',
          },
          skip,
          take,
        }),
        (this.prisma as any).tbl_invoice.count({ where }),
      ]);

      return {
        data,
        total,
        skip,
        take,
        hasMore: skip + take < total,
      };
    } catch (error) {
      console.error('InvoiceService.findAll error:', error?.message ?? error);
      throw error;
    }
  }

  async findOne(id: string) {
    const prisma =
      await this.getSchemaClient();

    const invoice =
      await prisma.tbl_invoice.findUnique({
        where: {
          pk_invoice_id: id,
        },
        include: {
          vendor: true,
          request: true,
          purchase_order: true,
          goods_receipt: true,
        },
      });

    if (!invoice) {
      throw new NotFoundException(
        'Invoice not found',
      );
    }

    return invoice;
  }

  async update(
    id: string,
    dto: UpdateInvoiceDto,
    userId: string,
  ) {
    const prisma =
      await this.getSchemaClient();

    await this.findOne(id);

    return prisma.tbl_invoice.update({
      where: {
        pk_invoice_id: id,
      },
      data: {
        ...dto,
        modified: new Date(),
        fk_modified_id: userId,
      },
    });
  }

  async markAsPaid(
    id: string,
    userId: string,
  ) {
    const prisma =
      await this.getSchemaClient();

    await this.findOne(id);

    return prisma.tbl_invoice.update({
      where: {
        pk_invoice_id: id,
      },
      data: {
        status: 'PAID',
        paid_at: new Date(),
        modified: new Date(),
        fk_modified_id: userId,
      },
    });
  }

  async remove(id: string) {
    const prisma =
      await this.getSchemaClient();

    await this.findOne(id);

    return prisma.tbl_invoice.delete({
      where: {
        pk_invoice_id: id,
      },
    });
  }

  async findByVendorId(
    vendorId: string,
    skip: number = 0,
    take: number = 10,
  ) {
    const prisma =
      await this.getSchemaClient();

    const [data, total] = await Promise.all([
      prisma.tbl_invoice.findMany({
        where: {
          fk_vendor_id: vendorId,
        },
        include: {
          vendor: true,
          request: true,
          purchase_order: true,
          goods_receipt: true,
        },
        orderBy: {
          created: 'desc',
        },
        skip,
        take,
      }),

      this.prisma.tbl_invoice.count({
        where: {
          fk_vendor_id: vendorId,
        },
      }),
    ]);

    return {
      data,
      total,
      skip,
      take,
      hasMore: skip + take < total,
    };
  }
}