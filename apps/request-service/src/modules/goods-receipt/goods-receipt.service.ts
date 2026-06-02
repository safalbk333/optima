import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/database/prisma-service";
import { CreateGoodsReceiptDto } from "./dto/create-goods-receipt.dto";
import { UpdateGoodsReceiptDto } from "./dto/update-goods-receipt.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { GoodsReceiptProperties } from '../../common/properties/goods-receipt.properties';

@Injectable()
export class GoodsReceiptService {
  private readonly logger = new AppLogger(GoodsReceiptService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(objData: CreateGoodsReceiptDto) {
    try {
      this.logger.log(GoodsReceiptProperties.service.create.start);
      const { arrItems, ...receiptData } = objData;

      const goodsReceipt = await this.prisma.tbl_goods_receipt.create({
        data: {
          chr_grn_code: receiptData.strGrnCode,
          chr_status: receiptData.strStatus || 'PENDING',
          dt_received_at: new Date(receiptData.strReceivedAt),
          chr_delivery_note_no: receiptData.strDeliveryNoteNo,
          txt_notes: receiptData.strNotes,
          purchase_order: { connect: { pk_chr_purchase_order_id: receiptData.strPurchaseOrderId } },
          request: { connect: { pk_chr_request_id: receiptData.strRequestId } },
          vendor: { connect: { pk_chr_vendor_id: receiptData.strVendorId } },
          ...(receiptData.strCreatedId && {
            created_by: { connect: { pk_chr_user_id: receiptData.strCreatedId } },
          }),
          ...(arrItems && arrItems.length > 0 && {
            goods_receipt_items: {
              create: arrItems.map(item => ({
                fk_chr_item_id: item.strItemId,
                int_quantity_ordered: item.intQuantityOrdered,
                int_quantity_received: item.intQuantityReceived,
                int_quantity_rejected: item.intQuantityRejected || 0,
                chr_unit_of_measure: item.strUnitOfMeasure,
                txt_rejection_reason: item.strRejectionReason,
              })),
            },
          }),
        },
        include: {
          purchase_order: {
            select: {
              pk_chr_purchase_order_id: true,
              chr_po_number: true,
            },
          },
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
          goods_receipt_items: {
            include: {
              item: true,
            },
          },
        },
      });

      this.logger.log(`${GoodsReceiptProperties.service.create.success}: ${goodsReceipt.pk_chr_goods_receipt_id}`);
      return ResponseHelper.success(
        goodsReceipt,
        "Goods receipt created successfully",
      );
    } catch (error) {
      this.logger.error(
        GoodsReceiptProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to create goods receipt", error.message);
    }
  }

  async findAll() {
    try {
      this.logger.log(GoodsReceiptProperties.service.findAll.start);
      const goodsReceipts = await this.prisma.tbl_goods_receipt.findMany({
        include: {
          purchase_order: {
            select: {
              pk_chr_purchase_order_id: true,
              chr_po_number: true,
            },
          },
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
          goods_receipt_items: {
            include: {
              item: true,
            },
          },
        },
        orderBy: {
          tim_created: 'desc',
        },
      });

      this.logger.log(GoodsReceiptProperties.service.findAll.success);
      return ResponseHelper.success(
        goodsReceipts,
        "Goods receipts fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        GoodsReceiptProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch goods receipts", error.message);
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(`${GoodsReceiptProperties.service.findOne.start}: ${strId}`);
      const goodsReceipt = await this.prisma.tbl_goods_receipt.findUnique({
        where: { pk_chr_goods_receipt_id: strId },
        include: {
          purchase_order: {
            select: {
              pk_chr_purchase_order_id: true,
              chr_po_number: true,
            },
          },
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
          goods_receipt_items: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!goodsReceipt) {
        throw new NotFoundException("Goods receipt not found");
      }

      this.logger.log(`${GoodsReceiptProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(
        goodsReceipt,
        "Goods receipt fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        `${GoodsReceiptProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(strId: string, objData: UpdateGoodsReceiptDto) {
    try {
      this.logger.log(`${GoodsReceiptProperties.service.update.start}: ${strId}`);
      const goodsReceipt = await this.prisma.tbl_goods_receipt.findUnique({
        where: { pk_chr_goods_receipt_id: strId },
      });

      if (!goodsReceipt) {
        throw new NotFoundException("Goods receipt not found");
      }

      const { arrItems, ...updateData } = objData;

      const updatedGoodsReceipt = await this.prisma.tbl_goods_receipt.update({
        where: { pk_chr_goods_receipt_id: strId },
        data: {
          ...(updateData.strStatus !== undefined && { chr_status: updateData.strStatus }),
          ...(updateData.strReceivedAt !== undefined && { dt_received_at: new Date(updateData.strReceivedAt) }),
          ...(updateData.strDeliveryNoteNo !== undefined && { chr_delivery_note_no: updateData.strDeliveryNoteNo }),
          ...(updateData.strNotes !== undefined && { txt_notes: updateData.strNotes }),
          ...(updateData.strModifiedId && { modified_by: { connect: { pk_chr_user_id: updateData.strModifiedId } } }),
          tim_modified: new Date(),
          ...(arrItems && {
            goods_receipt_items: {
              deleteMany: {},
              create: arrItems.map(item => ({
                fk_chr_item_id: item.strItemId,
                int_quantity_ordered: item.intQuantityOrdered,
                int_quantity_received: item.intQuantityReceived,
                int_quantity_rejected: item.intQuantityRejected || 0,
                chr_unit_of_measure: item.strUnitOfMeasure,
                txt_rejection_reason: item.strRejectionReason,
              })),
            },
          }),
        },
        include: {
          purchase_order: {
            select: {
              pk_chr_purchase_order_id: true,
              chr_po_number: true,
            },
          },
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
          goods_receipt_items: {
            include: {
              item: true,
            },
          },
        },
      });

      this.logger.log(`${GoodsReceiptProperties.service.update.success}: ${strId}`);
      return ResponseHelper.success(
        updatedGoodsReceipt,
        "Goods receipt updated successfully",
      );
    } catch (error) {
      this.logger.error(
        `${GoodsReceiptProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${GoodsReceiptProperties.service.delete.start}: ${strId}`);
      const goodsReceipt = await this.prisma.tbl_goods_receipt.findUnique({
        where: { pk_chr_goods_receipt_id: strId },
      });

      if (!goodsReceipt) {
        throw new NotFoundException("Goods receipt not found");
      }

      const deletedGoodsReceipt = await this.prisma.tbl_goods_receipt.delete({
        where: { pk_chr_goods_receipt_id: strId },
      });

      this.logger.log(`${GoodsReceiptProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(
        deletedGoodsReceipt,
        "Goods receipt deleted successfully",
      );
    } catch (error) {
      this.logger.error(
        `${GoodsReceiptProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
