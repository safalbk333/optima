import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/database/prisma-service";
import { CreatePurchaseOrderDto } from "./dto/create-purchase-order.dto";
import { UpdatePurchaseOrderDto } from "./dto/update-purchase-order.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { PurchaseOrderProperties } from '../../common/properties/purchase-order.properties';

@Injectable()
export class PurchaseOrderService {
  private readonly logger = new AppLogger(PurchaseOrderService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(objData: CreatePurchaseOrderDto) {
    try {
      this.logger.log(PurchaseOrderProperties.service.create.start);
      const purchaseOrder = await this.prisma.tbl_purchase_order.create({
        data: {
          chr_po_number: objData.strPoNumber,
          flt_total_value: objData.intTotalValue,
          chr_currency: objData.strCurrency || 'USD',
          dt_issued_at: objData.strIssuedAt ? new Date(objData.strIssuedAt) : undefined,
          chr_delivery_address: objData.strDeliveryAddress,
          dt_expected_delivery: objData.strExpectedDelivery ? new Date(objData.strExpectedDelivery) : undefined,
          request: { connect: { pk_chr_request_id: objData.strRequestId } },
          vendor: { connect: { pk_chr_vendor_id: objData.strVendorId } },
          quotation: { connect: { pk_chr_quotation_id: objData.strQuotationId } },
          ...(objData.strHtmlContent && { txt_rendered_html: objData.strHtmlContent }),
          ...(objData.strCreatedId && {
            created_by: {
              connect: { pk_chr_user_id: objData.strCreatedId },
            },
          }),
        },
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          vendor: {
            select: {
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          quotation: {
            select: {
              pk_chr_quotation_id: true,
              chr_status: true,
            },
          },
        },
      });

      this.logger.log(`${PurchaseOrderProperties.service.create.success}: ${purchaseOrder.pk_chr_purchase_order_id}`);
      return ResponseHelper.success(
        purchaseOrder,
        "Purchase order created successfully",
      );
    } catch (error) {
      this.logger.error(
        PurchaseOrderProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to create purchase order", error.message);
    }
  }

  async findAll() {
    try {
      this.logger.log(PurchaseOrderProperties.service.findAll.start);
      const purchaseOrders = await this.prisma.tbl_purchase_order.findMany({
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          vendor: {
            select: {
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          quotation: {
            select: {
              pk_chr_quotation_id: true,
              chr_status: true,
            },
          },
        },
        orderBy: {
          tim_created: 'desc',
        },
      });

      this.logger.log(PurchaseOrderProperties.service.findAll.success);
      return ResponseHelper.success(
        purchaseOrders,
        "Purchase orders fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        PurchaseOrderProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch purchase orders", error.message);
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(`${PurchaseOrderProperties.service.findOne.start}: ${strId}`);
      const purchaseOrder = await this.prisma.tbl_purchase_order.findUnique({
        where: { pk_chr_purchase_order_id: strId },
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          vendor: {
            select: {
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          quotation: {
            select: {
              pk_chr_quotation_id: true,
              chr_status: true,
            },
          },
        },
      });

      if (!purchaseOrder) {
        throw new NotFoundException("Purchase order not found");
      }

      this.logger.log(`${PurchaseOrderProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(
        purchaseOrder,
        "Purchase order fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        `${PurchaseOrderProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByVendorId(strVendorId: string) {
    try {
      this.logger.log(`${PurchaseOrderProperties.service.findByVendorId.start}: ${strVendorId}`);
      const vendor = await this.prisma.tbl_vendor.findUnique({
        where: { pk_chr_vendor_id: strVendorId },
      });

      if (!vendor) {
        throw new NotFoundException('Vendor not found');
      }

      const purchaseOrders = await this.prisma.tbl_purchase_order.findMany({
        where: { fk_chr_vendor_id: strVendorId },
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          vendor: {
            select: {
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          quotation: {
            select: {
              pk_chr_quotation_id: true,
              chr_status: true,
            },
          },
        },
        orderBy: { tim_created: 'desc' },
      });

      this.logger.log(PurchaseOrderProperties.service.findByVendorId.success);
      return ResponseHelper.success(purchaseOrders, 'Purchase orders fetched successfully');
    } catch (error) {
      this.logger.error(PurchaseOrderProperties.service.findByVendorId.error, error.stack);
      throw error;
    }
  }

  async update(strId: string, objData: UpdatePurchaseOrderDto) {
    try {
      this.logger.log(`${PurchaseOrderProperties.service.update.start}: ${strId}`);
      const purchaseOrder = await this.prisma.tbl_purchase_order.findUnique({
        where: { pk_chr_purchase_order_id: strId },
      });

      if (!purchaseOrder) {
        throw new NotFoundException("Purchase order not found");
      }

      const updatedPurchaseOrder = await this.prisma.tbl_purchase_order.update({
        where: { pk_chr_purchase_order_id: strId },
        data: {
          ...(objData.strPoNumber !== undefined && { chr_po_number: objData.strPoNumber }),
          ...(objData.intTotalValue !== undefined && { flt_total_value: objData.intTotalValue }),
          ...(objData.strCurrency !== undefined && { chr_currency: objData.strCurrency }),
          ...(objData.strIssuedAt !== undefined && { dt_issued_at: new Date(objData.strIssuedAt) }),
          ...(objData.strDeliveryAddress !== undefined && { chr_delivery_address: objData.strDeliveryAddress }),
          ...(objData.strExpectedDelivery !== undefined && { dt_expected_delivery: new Date(objData.strExpectedDelivery) }),
          ...(objData.strVendorId !== undefined && { vendor: { connect: { pk_chr_vendor_id: objData.strVendorId } } }),
          ...(objData.strQuotationId !== undefined && { quotation: { connect: { pk_chr_quotation_id: objData.strQuotationId } } }),
          ...(objData.strModifiedId && { modified_by: { connect: { pk_chr_user_id: objData.strModifiedId } } }),
          tim_modified: new Date(),
        },
        include: {
          request: {
            select: {
              pk_chr_request_id: true,
              chr_request_number: true,
              chr_title: true,
            },
          },
          vendor: {
            select: {
              pk_chr_vendor_id: true,
              chr_vendor_name: true,
              chr_vendor_email: true,
            },
          },
          quotation: {
            select: {
              pk_chr_quotation_id: true,
              chr_status: true,
            },
          },
        },
      });

      this.logger.log(`${PurchaseOrderProperties.service.update.success}: ${strId}`);
      return ResponseHelper.success(
        updatedPurchaseOrder,
        "Purchase order updated successfully",
      );
    } catch (error) {
      this.logger.error(
        `${PurchaseOrderProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${PurchaseOrderProperties.service.delete.start}: ${strId}`);
      const purchaseOrder = await this.prisma.tbl_purchase_order.findUnique({
        where: { pk_chr_purchase_order_id: strId },
      });

      if (!purchaseOrder) {
        throw new NotFoundException("Purchase order not found");
      }

      const deletedPurchaseOrder = await this.prisma.tbl_purchase_order.delete({
        where: { pk_chr_purchase_order_id: strId },
      });

      this.logger.log(`${PurchaseOrderProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(
        deletedPurchaseOrder,
        "Purchase order deleted successfully",
      );
    } catch (error) {
      this.logger.error(
        `${PurchaseOrderProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
