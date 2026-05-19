import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import Quotation_status from '../constant/enum';


@Injectable()
export class QuotationService {
  private readonly logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.logger = new Logger(QuotationService.name);
  }

  async create(createQuotationDto: CreateQuotationDto) {
    try {
      const rfqNo = await this.generateRfqNo();
      const statusKey = createQuotationDto.status.toUpperCase() as keyof typeof Quotation_status;

      // Get corresponding numeric value
      const statusValue = Quotation_status[statusKey];

      // Optional validation
      if (!statusValue) {
        throw new Error('Invalid quotation status');
      }
      return this.prisma.quotation.create({
        data: {
          vendor_id: createQuotationDto.vendorId,
          rfq_no: rfqNo,
          rfq_title: createQuotationDto.rfqTitle,
          category: createQuotationDto.category,
          issue_date: createQuotationDto.issueDate,
          due_date: createQuotationDto.dueDate,
          buyer: createQuotationDto.buyer,
          status: statusValue,
        },
      });
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    status?: string;
  }) {
    try {
      let page =
        !isNaN(Number(payload?.page)) && Number(payload?.page) > 0
          ? Number(payload.page)
          : 1;

      const limit =
        !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0
          ? Number(payload.limit)
          : 10;

      const offset = (page - 1) * limit;
      const whereClause: any = {};

      if (payload.search) {
        whereClause.OR = [
          {
            rfq_no: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
          {
            rfq_title: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
        ];
      }

      if (payload.status) {
        const statusKey = payload.status.toUpperCase() as keyof typeof Quotation_status;

        const statusValue = Quotation_status[statusKey];

        if (!statusValue) {
          throw new Error('Invalid quotation status');
        }

        whereClause.status = statusValue;
      }

      const quotations = await this.prisma.quotation.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
      });
      if (!quotations) {
        throw new NotFoundException(
          'No quotations found',
        );
      }
      return quotations;
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(quotation_id: string) {
    try {
      const quotation =
        await this.prisma.quotation.findUnique({
          where: { id: quotation_id },
        });

      if (!quotation) {
        throw new NotFoundException(
          'Quotation not found',
        );
      }
      return quotation;
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async generateRfqNo(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now
      .toLocaleString('en-US', { month: 'short' })
      .toUpperCase();

    // Get last created quotation
    const lastQuotation = await this.prisma.quotation.findFirst({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        rfq_no: true,
      },
    });

    let nextNumber = 1;

    if (lastQuotation?.rfq_no) {
      const parts = lastQuotation.rfq_no.split('-');
      const lastSequence = parseInt(parts[3], 10);
      nextNumber = lastSequence + 1;
    }
    const sequence = String(nextNumber).padStart(3, '0');
    return `RFQ-${year}-${month}-${sequence}`;
  }
}