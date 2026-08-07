import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/database/prisma-service";
import { CreateRequestForQuotationDto } from "./dto/create-request-for-quotation.dto";
import { UpdateRequestForQuotationDto } from "./dto/update-request-for-quotation.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { RequestForQuotationProperties } from '../../common/properties/request-for-quotation.properties';

@Injectable()
export class RequestForQuotationService {
  private readonly logger = new AppLogger(RequestForQuotationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      this.logger.log(RequestForQuotationProperties.service.findAll.start);
      const rfqs = await this.prisma.tbl_request_for_quotation.findMany({
        include: {
          request: {
            select: {
              pk_request_id: true,
              request_number: true,
              title: true,
              fk_category_id: true,
            },
          },
          eoi: {
            select: {
              pk_eoi_id: true,
              eoi_code: true,
              eoi_title: true,
            },
          },
          quotations: {
            include: {
              vendor: {
                select: {
                  pk_vendor_id: true,
                  company_legal_name: true,
                },
              },
            },
          },
        },
        orderBy: {
          created: 'desc',
        },
      });

      this.logger.log(RequestForQuotationProperties.service.findAll.success);
      return ResponseHelper.success(
        rfqs,
        "RFQs fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        RequestForQuotationProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch RFQs", error.message);
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(`${RequestForQuotationProperties.service.findOne.start}: ${strId}`);
      const rfq = await this.prisma.tbl_request_for_quotation.findUnique({
        where: { pk_rfq_id: strId },
        include: {
          request: {
            select: {
              pk_request_id: true,
              request_number: true,
              title: true,
              requested_by: {
                select: {
                  pk_user_id: true,
                  user_name: true,
                  user_email: true,
                },
              },
            },
          },
          eoi: {
            select: {
              pk_eoi_id: true,
              eoi_code: true,
              eoi_title: true,
              vendor: {
                select: {
                  pk_vendor_id: true,
                  company_legal_name: true,
                },
              },
            },
          },
          quotations: {
            include: {
              vendor: {
                select: {
                  pk_vendor_id: true,
                  company_legal_name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (!rfq) {
        throw new NotFoundException("RFQ not found");
      }

      this.logger.log(`${RequestForQuotationProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(
        rfq,
        "RFQ fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        `${RequestForQuotationProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(objData: CreateRequestForQuotationDto) {
    try {
      this.logger.log(RequestForQuotationProperties.service.create.start);
      const { arrItems, ...rfqData } = objData;
      const rfq = await this.prisma.tbl_request_for_quotation.create({
        data: {
          rfq_code: rfqData.strRfqCode,
          rfq_title: rfqData.strRfqTitle,
          fk_request_id: rfqData.strRequestId,
          fk_eoi_id: rfqData.strEoiId,
          status: rfqData.strStatus || 'DRAFT',
          issue_date: new Date(rfqData.strIssueDate),
          due_date: new Date(rfqData.strDueDate),
          submission_deadline: new Date(rfqData.strSubmissionDeadline),
          notes: rfqData.strNotes,
          fk_created_id: rfqData.strCreatedId,
          ...(rfqData.strHtmlContent && { rendered_html: rfqData.strHtmlContent }),
          ...(arrItems && arrItems.length > 0 && {
            // rfq_item_mappings_disabled: {
            //   create: arrItems.map(item => ({
            //     fk_item_id: item.strItemId,
            //     item_description: '',
            //     quantity: item.intQuantity,
            //   })),
            // },
          }),
        },
        include: {
          request: {
            select: {
              pk_request_id: true,
              request_number: true,
              title: true,
            },
          },
          eoi: {
            select: {
              pk_eoi_id: true,
              eoi_code: true,
              eoi_title: true,
            },
          },
        },
      });

      this.logger.log(`${RequestForQuotationProperties.service.create.success}: ${rfq.pk_rfq_id}`);
      return ResponseHelper.success(
        rfq,
        "RFQ created successfully",
      );
    } catch (error) {
      this.logger.error(
        RequestForQuotationProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to create RFQ", error.message);
    }
  }

  async update(strId: string, objData: UpdateRequestForQuotationDto) {
    try {
      this.logger.log(`${RequestForQuotationProperties.service.update.start}: ${strId}`);
      const rfq = await this.prisma.tbl_request_for_quotation.findUnique({
        where: { pk_rfq_id: strId },
      });

      if (!rfq) {
        throw new NotFoundException("RFQ not found");
      }

      const { arrItems, ...restData } = objData;

      const updateData: any = {
        rfq_title: restData.strRfqTitle,
        fk_eoi_id: restData.strEoiId,
        status: restData.strStatus,
        notes: restData.strNotes,
        fk_modified_id: restData.strModifiedId,
        modified: new Date(),
      };

      if (restData.strIssueDate) {
        updateData.issue_date = new Date(restData.strIssueDate);
      }
      if (restData.strDueDate) {
        updateData.due_date = new Date(restData.strDueDate);
      }
      if (restData.strSubmissionDeadline) {
        updateData.submission_deadline = new Date(restData.strSubmissionDeadline);
      }

      if (arrItems) {
        updateData.rfq_item_mappings = {
          deleteMany: {},
          create: arrItems.map(item => ({
            fk_item_id: item.strItemId,
            item_description: '',
            quantity: item.intQuantity,
          })),
        };
      }

      const updatedRfq = await this.prisma.tbl_request_for_quotation.update({
        where: { pk_rfq_id: strId },
        data: updateData,
        include: {
          request: {
            select: {
              pk_request_id: true,
              request_number: true,
              title: true,
            },
          },
          eoi: {
            select: {
              pk_eoi_id: true,
              eoi_code: true,
              eoi_title: true,
            },
          },
        },
      });

      this.logger.log(`${RequestForQuotationProperties.service.update.success}: ${strId}`);
      return ResponseHelper.success(
        updatedRfq,
        "RFQ updated successfully",
      );
    } catch (error) {
      this.logger.error(
        `${RequestForQuotationProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByVendorId(strVendorId: string) {
    try {
      this.logger.log(RequestForQuotationProperties.service.findByVendorId.start);
      const vendor = await this.prisma.tbl_vendor.findUnique({
        where: { pk_vendor_id: strVendorId },
      });

      if (!vendor) {
        throw new NotFoundException('Vendor not found');
      }

      const rfqs = await this.prisma.tbl_request_for_quotation.findMany({
        where: {
          eoi: {
            fk_vendor_id: strVendorId,
          },
        },
        include: {
          request: {
            select: {
              pk_request_id: true,
              request_number: true,
              title: true,
            },
          },
          eoi: {
            select: {
              pk_eoi_id: true,
              eoi_code: true,
              eoi_title: true,
            },
          },
          quotations: {
            include: {
              vendor: {
                select: {
                  pk_vendor_id: true,
                  company_legal_name: true,
                },
              },
            },
          },
        },
        orderBy: { created: 'desc' },
      });

      this.logger.log(RequestForQuotationProperties.service.findByVendorId.success);
      return ResponseHelper.success(rfqs, 'RFQs fetched successfully');
    } catch (error) {
      this.logger.error(RequestForQuotationProperties.service.findByVendorId.error, error.stack);
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${RequestForQuotationProperties.service.delete.start}: ${strId}`);
      const rfq = await this.prisma.tbl_request_for_quotation.findUnique({
        where: { pk_rfq_id: strId },
      });

      if (!rfq) {
        throw new NotFoundException("RFQ not found");
      }

      const deletedRfq = await this.prisma.tbl_request_for_quotation.delete({
        where: { pk_rfq_id: strId },
      });
      
      this.logger.log(`${RequestForQuotationProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(
        deletedRfq,
        "RFQ deleted successfully",
      );
    } catch (error) {
      this.logger.error(
        `${RequestForQuotationProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
