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
  ) { }

  async create(createQuotationDto: CreateQuotationDto) {
    try {
      this.logger.log(
        QuotationProperties.service.create.start,
      );

      const quotation =
        await this.prisma.tbl_quotation.create({
          data: {
            title: createQuotationDto.title,
            vendor: {
              connect: {
                pk_vendor_id:
                  createQuotationDto.vendorId,
              },
            },

            rfq: {
              connect: {
                pk_rfq_id:
                  createQuotationDto.rfqId,
              },
            },

            request: {
              connect: {
                pk_request_id:
                  createQuotationDto.requestId,
              },
            },

            ...(createQuotationDto.category && {
              category: {
                connect: {
                  pk_category_id:
                    createQuotationDto.category,
                },
              },
            }),

            ...(createQuotationDto.buyer && {
              buyer: {
                connect: {
                  pk_user_id:
                    createQuotationDto.buyer,
                },
              },
            }),
              ...(createQuotationDto.strHtmlContent && { rendered_html: createQuotationDto.strHtmlContent }),

            status: createQuotationDto.status.toUpperCase(),

            issue_date: new Date(
              createQuotationDto.issueDate,
            ),

            due_date: new Date(
              createQuotationDto.dueDate,
            ),
          },
        });

      this.logger.log(
        `${QuotationProperties.service.create.success}: ${quotation.pk_quotation_id}`,
      );

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

      const quotations = await this.prisma.tbl_quotation.findMany({
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
      this.logger.log(
        `${QuotationProperties.service.findOne.start}: ${quotation_id}`,
      );

      const quotation =
        await this.prisma.tbl_quotation.findUnique({
          where: {
            pk_quotation_id: quotation_id,
          },
        });

      if (!quotation) {
        throw new NotFoundException(
          'Quotation not found',
        );
      }

      this.logger.log(
        `${QuotationProperties.service.findOne.success}: ${quotation_id}`,
      );

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
      this.logger.log(
        QuotationProperties.service.generateRfqNo.start,
      );

      const now = new Date();

      const year = now.getFullYear();

      const month = now
        .toLocaleString('en-US', {
          month: 'short',
        })
        .toUpperCase();

      const lastQuotation =
        await this.prisma.tbl_request_for_quotation.findFirst({
          orderBy: {
            created: 'desc',
          },
          select: {
            pk_rfq_id: true,
          },
        });

      let nextNumber = 1;

      if (lastQuotation?.pk_rfq_id) {
        const parts =
          lastQuotation.pk_rfq_id.split('-');

        const lastSequence = parseInt(
          parts[3],
          10,
        );

        nextNumber = lastSequence + 1;
      }

      const sequence = String(nextNumber).padStart(
        3,
        '0',
      );

      const rfqNo = `RFQ-${year}-${month}-${sequence}`;

      this.logger.log(
        `${QuotationProperties.service.generateRfqNo.success}: ${rfqNo}`,
      );

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
