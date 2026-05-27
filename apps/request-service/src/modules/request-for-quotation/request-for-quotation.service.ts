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
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          eoi: {
            select: {
              pk_chr_eoi_id: true,
              chr_eoi_code: true,
              chr_eoi_title: true,
            },
          },
          quotations: {
            include: {
              vendor: {
                select: {
                  pk_chr_vendor_id: true,
                  chr_vendor_name: true,
                },
              },
            },
          },
        },
        orderBy: {
          tim_created: 'desc',
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
        where: { pk_chr_rfq_id: strId },
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
              requested_by: {
                select: {
                  pk_chr_user_id: true,
                  chr_user_name: true,
                  chr_user_email: true,
                },
              },
            },
          },
          eoi: {
            select: {
              pk_chr_eoi_id: true,
              chr_eoi_code: true,
              chr_eoi_title: true,
              vendor: {
                select: {
                  pk_chr_vendor_id: true,
                  chr_vendor_name: true,
                },
              },
            },
          },
          quotations: {
            include: {
              vendor: {
                select: {
                  pk_chr_vendor_id: true,
                  chr_vendor_name: true,
                  chr_vendor_email: true,
                },
              },
              quotation_items: {
                include: {
                  item: true,
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
      const rfq = await this.prisma.tbl_request_for_quotation.create({
        data: {
          chr_rfq_code: objData.strRfqCode,
          chr_rfq_title: objData.strRfqTitle,
          fk_chr_request_id: objData.strRequestId,
          fk_chr_eoi_id: objData.strEoiId,
          chr_status: objData.strStatus || 'DRAFT',
          dt_issue_date: new Date(objData.strIssueDate),
          dt_due_date: new Date(objData.strDueDate),
          dt_submission_deadline: new Date(objData.strSubmissionDeadline),
          txt_notes: objData.strNotes,
          fk_chr_created_id: objData.strCreatedId,
        },
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          eoi: {
            select: {
              pk_chr_eoi_id: true,
              chr_eoi_code: true,
              chr_eoi_title: true,
            },
          },
        },
      });
      
      this.logger.log(`${RequestForQuotationProperties.service.create.success}: ${rfq.pk_chr_rfq_id}`);
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
        where: { pk_chr_rfq_id: strId },
      });

      if (!rfq) {
        throw new NotFoundException("RFQ not found");
      }

      const updateData: any = {
        chr_rfq_title: objData.strRfqTitle,
        fk_chr_eoi_id: objData.strEoiId,
        chr_status: objData.strStatus,
        txt_notes: objData.strNotes,
        fk_chr_modified_id: objData.strModifiedId,
        tim_modified: new Date(),
      };

      if (objData.strIssueDate) {
        updateData.dt_issue_date = new Date(objData.strIssueDate);
      }
      if (objData.strDueDate) {
        updateData.dt_due_date = new Date(objData.strDueDate);
      }
      if (objData.strSubmissionDeadline) {
        updateData.dt_submission_deadline = new Date(objData.strSubmissionDeadline);
      }

      const updatedRfq = await this.prisma.tbl_request_for_quotation.update({
        where: { pk_chr_rfq_id: strId },
        data: updateData,
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          eoi: {
            select: {
              pk_chr_eoi_id: true,
              chr_eoi_code: true,
              chr_eoi_title: true,
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

  async delete(strId: string) {
    try {
      this.logger.log(`${RequestForQuotationProperties.service.delete.start}: ${strId}`);
      const rfq = await this.prisma.tbl_request_for_quotation.findUnique({
        where: { pk_chr_rfq_id: strId },
      });

      if (!rfq) {
        throw new NotFoundException("RFQ not found");
      }

      const deletedRfq = await this.prisma.tbl_request_for_quotation.delete({
        where: { pk_chr_rfq_id: strId },
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
