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
          vendor: { connect: { pk_chr_vendor_id: quotationData.strVendorId } },
          rfq: { connect: { pk_chr_rfq_id: quotationData.strRfqId } },
          ...(quotationData.strCategoryId && {
            category: { connect: { pk_chr_category_id: quotationData.strCategoryId } },
          }),
          ...(quotationData.strBuyerId && {
            buyer: { connect: { pk_chr_user_id: quotationData.strBuyerId } },
          }),
          chr_buyer_details: quotationData.strBuyerDetails,
          chr_seller_details: quotationData.strSellerDetails,
          chr_status: quotationData.strStatus || 'DRAFT',
          flt_total_amount: quotationData.intTotalAmount,
          chr_currency: quotationData.strCurrency || 'USD',
          dt_issue_date: new Date(quotationData.strIssueDate),
          dt_due_date: new Date(quotationData.strDueDate),
          txt_notes: quotationData.strNotes,
          ...(quotationData.strCreatedId && {
            created_by: { connect: { pk_chr_user_id: quotationData.strCreatedId } },
          }),
          ...(quotationData.strHtmlContent && { txt_rendered_html: quotationData.strHtmlContent }),
          ...(arrItems && arrItems.length > 0 && {
            quotation_items: {
              create: arrItems.map(item => ({
                fk_chr_vendor_item_id: item.strVendorItemId,
                chr_item_description: item.strItemDescription,
                int_quantity: item.intQuantity,
                chr_unit_of_measure: item.strUnitOfMeasure,
                flt_unit_price: item.intUnitPrice,
                flt_tax_percentage: item.intTaxPercentage || 0,
                flt_tax_amount: item.intTaxAmount || 0,
                flt_total_price: item.intTotalPrice,
                chr_currency: item.strCurrency || 'USD',
                txt_notes: item.strNotes,
              })) as any,
            },
          }),
        },
        include: {
          vendor: true,
          rfq: true,
          category: true,
          buyer: true,
          quotation_items: true,
        },
      });

      this.logger.log(`${QuotationProperties.service.create.success}: ${quotation.pk_chr_quotation_id}`);
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
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          rfq: {
            select: {
              pk_chr_rfq_id: true,
              chr_rfq_code: true,
              chr_rfq_title: true,
            },
          },
          category: true,
          buyer: {
            select: {
              pk_chr_user_id: true,
              chr_user_name: true,
              chr_user_email: true,
            },
          },
          quotation_items: true,
        },
        orderBy: { tim_created: 'desc' },
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
        where: { pk_chr_quotation_id: strId },
        include: {
          vendor: {
            select: {
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          rfq: {
            select: {
              pk_chr_rfq_id: true,
              chr_rfq_code: true,
              chr_rfq_title: true,
            },
          },
          category: true,
          buyer: {
            select: {
              pk_chr_user_id: true,
              chr_user_name: true,
              chr_user_email: true,
            },
          },
          quotation_items: true,
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
        where: { pk_chr_quotation_id: strId },
      });

      if (!quotation) {
        throw new NotFoundException("Quotation not found");
      }

      const { arrItems, ...updateData } = objData;

      const updatedQuotation = await this.prisma.tbl_quotation.update({
        where: { pk_chr_quotation_id: strId },
        data: {
          ...(updateData.strVendorId !== undefined && {
            vendor: { connect: { pk_chr_vendor_id: updateData.strVendorId } },
          }),
          ...(updateData.strCategoryId !== undefined && {
            category: { connect: { pk_chr_category_id: updateData.strCategoryId } },
          }),
          ...(updateData.strBuyerId !== undefined && {
            buyer: { connect: { pk_chr_user_id: updateData.strBuyerId } },
          }),
          ...(updateData.strBuyerDetails !== undefined && { chr_buyer_details: updateData.strBuyerDetails }),
          ...(updateData.strSellerDetails !== undefined && { chr_seller_details: updateData.strSellerDetails }),
          ...(updateData.strStatus !== undefined && { chr_status: updateData.strStatus }),
          ...(updateData.intTotalAmount !== undefined && { flt_total_amount: updateData.intTotalAmount }),
          ...(updateData.strCurrency !== undefined && { chr_currency: updateData.strCurrency }),
          ...(updateData.strIssueDate !== undefined && { dt_issue_date: new Date(updateData.strIssueDate) }),
          ...(updateData.strDueDate !== undefined && { dt_due_date: new Date(updateData.strDueDate) }),
          ...(updateData.strNotes !== undefined && { txt_notes: updateData.strNotes }),
          ...(updateData.strModifiedId !== undefined && {
            modified_by: { connect: { pk_chr_user_id: updateData.strModifiedId } },
          }),
          tim_modified: new Date(),
          ...(arrItems && {
            quotation_items: {
              deleteMany: {},
              create: arrItems.map(item => ({
                fk_chr_vendor_item_id: item.strVendorItemId,
                chr_item_description: item.strItemDescription,
                int_quantity: item.intQuantity,
                chr_unit_of_measure: item.strUnitOfMeasure,
                flt_unit_price: item.intUnitPrice,
                flt_tax_percentage: item.intTaxPercentage || 0,
                flt_tax_amount: item.intTaxAmount || 0,
                flt_total_price: item.intTotalPrice,
                chr_currency: item.strCurrency || 'USD',
                txt_notes: item.strNotes,
              })) as any,
            },
          }),
        },
        include: {
          vendor: true,
          rfq: true,
          category: true,
          buyer: true,
          quotation_items: true,
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
        where: { pk_chr_quotation_id: strId },
      });

      if (!quotation) {
        throw new NotFoundException("Quotation not found");
      }

      const deletedQuotation = await this.prisma.tbl_quotation.delete({
        where: { pk_chr_quotation_id: strId },
      });

      this.logger.log(`${QuotationProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(deletedQuotation, "Quotation deleted successfully");
    } catch (error) {
      this.logger.error(`${QuotationProperties.service.delete.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
