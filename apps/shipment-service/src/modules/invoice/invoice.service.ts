import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateInvoiceDto,
    userId: string,
  ) {
    try {
      if (typeof (this.prisma as any).tbl_invoice === 'undefined') {
        throw new Error('Prisma client missing model `tbl_invoice`');
      }

      return (this.prisma as any).tbl_invoice.create({
        data: {
          ...dto,
          fk_chr_created_id: userId,
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
    const where: any = {};

    if (search && search.trim()) {
      where.OR = [
        {
          chr_invoice_number: {
            contains: search.trim(),
            mode: 'insensitive',
          },
        },
        {
          vendor: {
            chr_vendor_name: {
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
        (this.prisma as any).tbl_invoice.findMany({
        where,
        include: {
          vendor: true,
          request: true,
          purchase_order: true,
          goods_receipt: true,
        },
        orderBy: {
          tim_created: 'desc',
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
    const invoice =
      await this.prisma.tbl_invoice.findUnique({
        where: {
          pk_chr_invoice_id: id,
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
    await this.findOne(id);

    return this.prisma.tbl_invoice.update({
      where: {
        pk_chr_invoice_id: id,
      },
      data: {
        ...dto,
        tim_modified: new Date(),
        fk_chr_modified_id: userId,
      },
    });
  }

  async markAsPaid(
    id: string,
    userId: string,
  ) {
    await this.findOne(id);

    return this.prisma.tbl_invoice.update({
      where: {
        pk_chr_invoice_id: id,
      },
      data: {
        chr_status: 'PAID',
        dt_paid_at: new Date(),
        tim_modified: new Date(),
        fk_chr_modified_id: userId,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.tbl_invoice.delete({
      where: {
        pk_chr_invoice_id: id,
      },
    });
  }

  async findByVendorId(
  vendorId: string,
  skip: number = 0,
  take: number = 10,
) {
  const [data, total] = await Promise.all([
    this.prisma.tbl_invoice.findMany({
      where: {
        fk_chr_vendor_id: vendorId,
      },
      include: {
        vendor: true,
        request: true,
        purchase_order: true,
        goods_receipt: true,
      },
      orderBy: {
        tim_created: 'desc',
      },
      skip,
      take,
    }),

    this.prisma.tbl_invoice.count({
      where: {
        fk_chr_vendor_id: vendorId,
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