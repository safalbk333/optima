import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/database/prisma-service";
import { CreatePurchaseRequestDto } from "./dto/create-purchase-request.dto";
import { UpdatePurchaseRequestDto } from "./dto/update-purchase-request.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { PurchaseRequestProperties } from '../../common/properties/purchase-request.properties';

@Injectable()
export class PurchaseRequestService {
  private readonly logger = new AppLogger(PurchaseRequestService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      this.logger.log(PurchaseRequestProperties.service.findAll.start);
      const purchaseRequests = await this.prisma.tbl_purchase_request.findMany({
        include: {
          current_status: true,
          priority: true,
          requested_by: {
            select: {
              pk_chr_user_id: true,
              chr_user_name: true,
              chr_user_email: true,
            }
          },
          department: true,
          category: true,
        },
        orderBy: {
          tim_created: 'desc',
        },
      });

      this.logger.log(PurchaseRequestProperties.service.findAll.success);
      return ResponseHelper.success(
        purchaseRequests,
        "Purchase requests fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        PurchaseRequestProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch purchase requests", error.message);
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(`${PurchaseRequestProperties.service.findOne.start}: ${strId}`);
      const purchaseRequest = await this.prisma.tbl_purchase_request.findUnique({
        where: { pk_chr_request_id: strId },
        include: {
          current_status: true,
          priority: true,
          requested_by: {
            select: {
              pk_chr_user_id: true,
              chr_user_name: true,
              chr_user_email: true,
            }
          },
          department: true,
          category: true,
          pr_item_mappings: {
            include: {
              item: {
                include: {
                  category: true,
                }
              }
            }
          },
          approvals: {
            include: {
              approver: {
                select: {
                  pk_chr_user_id: true,
                  chr_user_name: true,
                  chr_user_email: true,
                }
              },
              approval_level: true,
            }
          },
          request_histories: {
            include: {
              from_status: true,
              to_status: true,
              from_phase: true,
              to_phase: true,
              changed_by: {
                select: {
                  pk_chr_user_id: true,
                  chr_user_name: true,
                }
              }
            },
            orderBy: {
              tim_created: 'desc',
            }
          },
        },
      });

      if (!purchaseRequest) {
        throw new NotFoundException("Purchase request not found");
      }

      this.logger.log(`${PurchaseRequestProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(
        purchaseRequest,
        "Purchase request fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        `${PurchaseRequestProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(objData: CreatePurchaseRequestDto) {
    try {
      this.logger.log(PurchaseRequestProperties.service.create.start);
      const purchaseRequest = await this.prisma.tbl_purchase_request.create({
        data: {
          chr_request_number: objData.strRequestNumber,
          chr_title: objData.strTitle,
          txt_description: objData.strDescription,
          fk_chr_current_status_id: objData.strCurrentStatusId,
          fk_chr_priority_id: objData.strPriorityId,
          flt_estimated_value: objData.intEstimatedValue,
          chr_currency: objData.strCurrency || 'USD',
          fk_chr_requested_by_id: objData.strRequestedById,
          fk_chr_department_id: objData.strDepartmentId,
          fk_chr_category_id: objData.strCategoryId,
          fk_chr_created_id: objData.strCreatedId,
          pr_item_mappings: {
            create: objData.arrItems.map(item => ({
              fk_chr_item_id: item.strItemId,
              chr_item_description: '',
              int_quantity: item.intQuantity,
            })),
          },
        },
        include: {
          current_status: true,
          priority: true,
          requested_by: {
            select: {
              pk_chr_user_id: true,
              chr_user_name: true,
              chr_user_email: true,
            }
          },
          department: true,
          category: true,
          pr_item_mappings: {
            include: {
              item: true,
            },
          },
        },
      });
      
      this.logger.log(`${PurchaseRequestProperties.service.create.success}: ${purchaseRequest.pk_chr_request_id}`);
      return ResponseHelper.success(
        purchaseRequest,
        "Purchase request created successfully",
      );
    } catch (error) {
      this.logger.error(
        PurchaseRequestProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to create purchase request", error.message);
    }
  }

  async update(strId: string, objData: UpdatePurchaseRequestDto) {
    try {
      this.logger.log(`${PurchaseRequestProperties.service.update.start}: ${strId}`);
      const purchaseRequest = await this.prisma.tbl_purchase_request.findUnique({
        where: { pk_chr_request_id: strId },
      });

      if (!purchaseRequest) {
        throw new NotFoundException("Purchase request not found");
      }

      const { arrItems, ...updateData } = objData;

      const updatedPurchaseRequest = await this.prisma.tbl_purchase_request.update({
        where: { pk_chr_request_id: strId },
        data: {
          ...updateData,
          tim_modified: new Date(),
          ...(arrItems && {
            pr_item_mappings: {
              deleteMany: {},
              create: arrItems.map(item => ({
                fk_chr_item_id: item.strItemId,
                chr_item_description: '',
                int_quantity: item.intQuantity,
              })),
            },
          }),
        },
        include: {
          current_status: true,
          priority: true,
          requested_by: {
            select: {
              pk_chr_user_id: true,
              chr_user_name: true,
              chr_user_email: true,
            }
          },
          department: true,
          category: true,
          pr_item_mappings: {
            include: {
              item: true,
            },
          },
        },
      });
      
      this.logger.log(`${PurchaseRequestProperties.service.update.success}: ${strId}`);
      return ResponseHelper.success(
        updatedPurchaseRequest,
        "Purchase request updated successfully",
      );
    } catch (error) {
      this.logger.error(
        `${PurchaseRequestProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${PurchaseRequestProperties.service.delete.start}: ${strId}`);
      const purchaseRequest = await this.prisma.tbl_purchase_request.findUnique({
        where: { pk_chr_request_id: strId },
      });

      if (!purchaseRequest) {
        throw new NotFoundException("Purchase request not found");
      }

      const deletedPurchaseRequest = await this.prisma.tbl_purchase_request.delete({
        where: { pk_chr_request_id: strId },
      });
      
      this.logger.log(`${PurchaseRequestProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(
        deletedPurchaseRequest,
        "Purchase request deleted successfully",
      );
    } catch (error) {
      this.logger.error(
        `${PurchaseRequestProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
