import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/database/prisma-service";
import { CreateQuotationDto } from "./dto/create-quotation.dto";
import { UpdateQuotationDto } from "./dto/update-quotation.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { QuotationProperties } from '../../common/properties/quotation.properties';

@Injectable()
export class QuotationService {
  private readonly logger = new AppLogger(QuotationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(objData: CreateQuotationDto) {
    try {
      this.logger.log(QuotationProperties.service.create.start);
      const { arrItems, ...quotationData } = objData;

      const quotation = await this.prisma.tbl_quotation.create({
        data: {
          title: quotationData.strRfqId, // Add title field
          vendor: { connect: { pk_vendor_id: quotationData.strVendorId } },
          rfq: { connect: { pk_rfq_id: quotationData.strRfqId } },
          request: { connect: { pk_request_id: quotationData.strRequestId } }, // Add request relation
          ...(quotationData.strCategoryId && {
            category: { connect: { pk_category_id: quotationData.strCategoryId } },
          }),
          ...(quotationData.strBuyerId && {
            buyer: { connect: { pk_user_id: quotationData.strBuyerId } },
          }),
          buyer_details: quotationData.strBuyerDetails,
          seller_details: quotationData.strSellerDetails,
          status: quotationData.strStatus || 'DRAFT',
          total_amount: quotationData.intTotalAmount,
          currency: quotationData.strCurrency || 'USD',
          issue_date: new Date(quotationData.strIssueDate),
          due_date: new Date(quotationData.strDueDate),
          notes: quotationData.strNotes,
          // ...(quotationData.strCreatedId && {
          //   created_by: { connect: { pk_user_id: quotationData.strCreatedId } },
          // }),
          ...(quotationData.strHtmlContent && { rendered_html: quotationData.strHtmlContent }),
          ...(arrItems && arrItems.length > 0 && {
            // quotation_items_disabled: {
            //   create: arrItems.map(item => ({
            //     fk_item_id: item.strItemId,
            //     item_description: item.strItemDescription,
            //     quantity: item.intQuantity,
            //     unit_of_measure: item.strUnitOfMeasure,
            //     unit_price: item.intUnitPrice,
            //     tax_percentage: item.intTaxPercentage || 0,
            //     tax_amount: item.intTaxAmount || 0,
            //     total_price: item.intTotalPrice,
            //     currency: item.strCurrency || 'USD',
            //     notes: item.strNotes,
            //   })) as any,
            // },
          }),
        },
        include: {
          vendor: true,
          rfq: true,
          category: true,
          buyer: true,
          // quotation_items removed
        },
      });

      this.logger.log(`${QuotationProperties.service.create.success}: ${quotation.pk_quotation_id}`);
      return ResponseHelper.success(quotation, "Quotation created successfully");
    } catch (error) {
      this.logger.error(QuotationProperties.service.create.error, error.stack);
      return ResponseHelper.error("Failed to create quotation", error.message);
    }
  }

  async findAll() {
    try {
      this.logger.log(QuotationProperties.service.findAll.start);
      const quotations = await this.prisma.tbl_quotation.findMany({
        include: {
          vendor: {
            select: {
              pk_vendor_id: true,
              company_legal_name: true,
              // email: true,
            },
          },
          rfq: {
            select: {
              pk_rfq_id: true,
              rfq_code: true,
              rfq_title: true,
            },
          },
          category: true,
          buyer: {
            select: {
              pk_user_id: true,
              user_name: true,
              user_email: true,
            },
          },
          // quotation_items removed
        },
        orderBy: { created: 'desc' },
      });

      this.logger.log(QuotationProperties.service.findAll.success);
      return ResponseHelper.success(quotations, "Quotations fetched successfully");
    } catch (error) {
      this.logger.error(QuotationProperties.service.findAll.error, error.stack);
      return ResponseHelper.error("Failed to fetch quotations", error.message);
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(`${QuotationProperties.service.findOne.start}: ${strId}`);
      const quotation = await this.prisma.tbl_quotation.findUnique({
        where: { pk_quotation_id: strId },
        include: {
          vendor: {
            select: {
              pk_vendor_id: true,
              company_legal_name: true,
              // email: true,
            },
          },
          rfq: {
            select: {
              pk_rfq_id: true,
              rfq_code: true,
              rfq_title: true,
            },
          },
          category: true,
          buyer: {
            select: {
              pk_user_id: true,
              user_name: true,
              user_email: true,
            },
          },
          // quotation_items removed
        },
      });

      if (!quotation) {
        throw new NotFoundException("Quotation not found");
      }

      this.logger.log(`${QuotationProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(quotation, "Quotation fetched successfully");
    } catch (error) {
      this.logger.error(`${QuotationProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strId: string, objData: UpdateQuotationDto) {
    try {
      this.logger.log(`${QuotationProperties.service.update.start}: ${strId}`);
      const quotation = await this.prisma.tbl_quotation.findUnique({
        where: { pk_quotation_id: strId },
      });

      if (!quotation) {
        throw new NotFoundException("Quotation not found");
      }

      const { arrItems, ...updateData } = objData;

      const updatedQuotation = await this.prisma.tbl_quotation.update({
        where: { pk_quotation_id: strId },
        data: {
          ...(updateData.strVendorId !== undefined && {
            vendor: { connect: { pk_vendor_id: updateData.strVendorId } },
          }),
          ...(updateData.strCategoryId !== undefined && {
            category: { connect: { pk_category_id: updateData.strCategoryId } },
          }),
          ...(updateData.strBuyerId !== undefined && {
            buyer: { connect: { pk_user_id: updateData.strBuyerId } },
          }),
          ...(updateData.strBuyerDetails !== undefined && { buyer_details: updateData.strBuyerDetails }),
          ...(updateData.strSellerDetails !== undefined && { seller_details: updateData.strSellerDetails }),
          ...(updateData.strStatus !== undefined && { status: updateData.strStatus }),
          ...(updateData.intTotalAmount !== undefined && { total_amount: updateData.intTotalAmount }),
          ...(updateData.strCurrency !== undefined && { currency: updateData.strCurrency }),
          ...(updateData.strIssueDate !== undefined && { issue_date: new Date(updateData.strIssueDate) }),
          ...(updateData.strDueDate !== undefined && { due_date: new Date(updateData.strDueDate) }),
          ...(updateData.strNotes !== undefined && { notes: updateData.strNotes }),
          ...(updateData.strModifiedId !== undefined && {
            modified_by: { connect: { pk_user_id: updateData.strModifiedId } },
          }),
          modified: new Date(),
          ...(arrItems && {
            quotation_items_disabled: {
              deleteMany: {},
              create: arrItems.map(item => ({
                fk_item_id: item.strItemId,
                item_description: item.strItemDescription,
                quantity: item.intQuantity,
                unit_of_measure: item.strUnitOfMeasure,
                unit_price: item.intUnitPrice,
                tax_percentage: item.intTaxPercentage || 0,
                tax_amount: item.intTaxAmount || 0,
                total_price: item.intTotalPrice,
                currency: item.strCurrency || 'USD',
                notes: item.strNotes,
              })) as any,
            },
          }),
        },
        include: {
          vendor: true,
          rfq: true,
          category: true,
          buyer: true,
          // quotation_items removed
        },
      });

      this.logger.log(`${QuotationProperties.service.update.success}: ${strId}`);
      return ResponseHelper.success(updatedQuotation, "Quotation updated successfully");
    } catch (error) {
      this.logger.error(`${QuotationProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${QuotationProperties.service.delete.start}: ${strId}`);
      const quotation = await this.prisma.tbl_quotation.findUnique({
        where: { pk_quotation_id: strId },
      });

      if (!quotation) {
        throw new NotFoundException("Quotation not found");
      }

      const deletedQuotation = await this.prisma.tbl_quotation.delete({
        where: { pk_quotation_id: strId },
      });

      this.logger.log(`${QuotationProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(deletedQuotation, "Quotation deleted successfully");
    } catch (error) {
      this.logger.error(`${QuotationProperties.service.delete.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
