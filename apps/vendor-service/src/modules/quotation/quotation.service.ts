import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import Quotation_status from '../constant/enum';
import { AppLogger } from '../../common/logger/app.logger';
import { QuotationProperties } from '../../common/properties/quotation.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';


@Injectable()
export class QuotationService {
  private readonly logger = new AppLogger(QuotationService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createQuotationDto: CreateQuotationDto) {
    try {
      this.logger.log(QuotationProperties.service.create.start);
      const rfqNo = await this.generateRfqNo();
      const statusKey = createQuotationDto.status.toUpperCase() as keyof typeof Quotation_status;

      const statusValue = Quotation_status[statusKey];

      if (!statusValue) {
        this.logger.error(QuotationProperties.service.create.invalidStatus);
        throw new Error('Invalid quotation status');
      }
      const quotation = await this.prisma.quotation.create({
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
      this.logger.log(`${QuotationProperties.service.create.success}: ${quotation.id}`);
      return ResponseHelper.success(
        quotation,
        'Quotation created successfully',
      );
    } catch (error) {
      this.logger.error(
        QuotationProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to create quotation',
        error.message,
      );
    }
  }

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    status?: string;
  }) {
    try {
      this.logger.log(QuotationProperties.service.findAll.start);
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
      this.logger.log(QuotationProperties.service.findAll.success);
      return ResponseHelper.success(
        quotations,
        'Quotations fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        QuotationProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to fetch quotations',
        error.message,
      );
    }
  }

  async findOne(quotation_id: string) {
    try {
      this.logger.log(`${QuotationProperties.service.findOne.start}: ${quotation_id}`);
      const quotation =
        await this.prisma.quotation.findUnique({
          where: { id: quotation_id },
        });

      if (!quotation) {
        throw new NotFoundException(
          'Quotation not found',
        );
      }
      this.logger.log(`${QuotationProperties.service.findOne.success}: ${quotation_id}`);
      return ResponseHelper.success(
        quotation,
        'Quotation fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        `${QuotationProperties.service.findOne.error}: ${quotation_id}`,
        error.stack,
      );
      throw error;
    }
  }

  async generateRfqNo(): Promise<string> {
    try {
      this.logger.log(QuotationProperties.service.generateRfqNo.start);
      const now = new Date();
      const year = now.getFullYear();
      const month = now
        .toLocaleString('en-US', { month: 'short' })
        .toUpperCase();

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
      const rfqNo = `RFQ-${year}-${month}-${sequence}`;
      this.logger.log(`${QuotationProperties.service.generateRfqNo.success}: ${rfqNo}`);
      return rfqNo;
    } catch (error) {
      this.logger.error(
        QuotationProperties.service.generateRfqNo.error,
        error.stack,
      );
      throw error;
    }
  }
}