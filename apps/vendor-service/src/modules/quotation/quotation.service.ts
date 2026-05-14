import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateQuotationDto } from './dto/create-quotation.dto';


@Injectable()
export class QuotationService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createQuotationDto: CreateQuotationDto) {
    return this.prisma.quotation.create({
      data: {
        vendor_id: createQuotationDto.vendorId,
        rfq_no: createQuotationDto.rfqNo,
        rfq_title: createQuotationDto.rfqTitle,
        category: createQuotationDto.category,
        issue_date: createQuotationDto.issueDate,
        due_date: createQuotationDto.dueDate,
        buyer: createQuotationDto.buyer,
        status: createQuotationDto.status,
      },
    });
  }

  async findAll() {
    return this.prisma.quotation.findMany();
  }

  async findOne(quotation_id: string) {
    const quotation =
      await this.prisma.quotation.findUnique({
        where: { id:quotation_id },
      });

    if (!quotation) {
      throw new NotFoundException(
        'Quotation not found',
      );
    }
    return quotation;
  }
}