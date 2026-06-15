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
          grn_code: receiptData.strGrnCode,
          status: receiptData.strStatus || 'PENDING',
          received_at: new Date(receiptData.strReceivedAt),
          delivery_note_no: receiptData.strDeliveryNoteNo,
          notes: receiptData.strNotes,
          fk_purchase_order_id: receiptData.strPurchaseOrderId,
          ...(receiptData.strHtmlContent && { rendered_html: receiptData.strHtmlContent }),
          ...(receiptData.strCreatedId && { fk_created_id: receiptData.strCreatedId }),
          ...(arrItems?.length > 0 && {
            goods_receipt_items: {
              create: arrItems.map(item => ({
                fk_item_id: item.strItemId,
                quantity_ordered: item.intQuantityOrdered,
                quantity_received: item.intQuantityReceived,
                quantity_rejected: item.intQuantityRejected || 0,
                unit_of_measure: item.strUnitOfMeasure,
                rejection_reason: item.strRejectionReason,
              })),
            },
          }),
        } as any,
        include: {
          purchase_order: {
            select: {
              pk_purchase_order_id: true,
              po_number: true,
            },
          },
          goods_receipt_items: {
            include: {
              item: true,
            },
          },
        },
      });

      this.logger.log(`${GoodsReceiptProperties.service.create.success}: ${goodsReceipt.pk_goods_receipt_id}`);
      return ResponseHelper.success(goodsReceipt, "Goods receipt created successfully");
    } catch (error) {
      this.logger.error(GoodsReceiptProperties.service.create.error, error.stack);
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
              pk_purchase_order_id: true,
              po_number: true,
            },
          },
          goods_receipt_items: {
            include: {
              item: true,
            },
          },
        },
        orderBy: { created: 'desc' },
      });

      this.logger.log(GoodsReceiptProperties.service.findAll.success);
      return ResponseHelper.success(goodsReceipts, "Goods receipts fetched successfully");
    } catch (error) {
      this.logger.error(GoodsReceiptProperties.service.findAll.error, error.stack);
      return ResponseHelper.error("Failed to fetch goods receipts", error.message);
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(`${GoodsReceiptProperties.service.findOne.start}: ${strId}`);
      const goodsReceipt = await this.prisma.tbl_goods_receipt.findUnique({
        where: { pk_goods_receipt_id: strId },
        include: {
          purchase_order: {
            select: {
              pk_purchase_order_id: true,
              po_number: true,
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
      return ResponseHelper.success(goodsReceipt, "Goods receipt fetched successfully");
    } catch (error) {
      this.logger.error(`${GoodsReceiptProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strId: string, objData: UpdateGoodsReceiptDto) {
    try {
      this.logger.log(`${GoodsReceiptProperties.service.update.start}: ${strId}`);
      const goodsReceipt = await this.prisma.tbl_goods_receipt.findUnique({
        where: { pk_goods_receipt_id: strId },
      });

      if (!goodsReceipt) {
        throw new NotFoundException("Goods receipt not found");
      }

      const { arrItems, ...updateData } = objData;

      const updatedGoodsReceipt = await this.prisma.tbl_goods_receipt.update({
        where: { pk_goods_receipt_id: strId },
        data: {
          ...(updateData.strStatus !== undefined && { status: updateData.strStatus }),
          ...(updateData.strReceivedAt !== undefined && { received_at: new Date(updateData.strReceivedAt) }),
          ...(updateData.strDeliveryNoteNo !== undefined && { delivery_note_no: updateData.strDeliveryNoteNo }),
          ...(updateData.strNotes !== undefined && { notes: updateData.strNotes }),
          ...(updateData.strModifiedId && { fk_modified_id: updateData.strModifiedId }),
          modified: new Date(),
          ...(arrItems && {
            goods_receipt_items: {
              deleteMany: {},
              create: arrItems.map(item => ({
                fk_item_id: item.strItemId,
                quantity_ordered: item.intQuantityOrdered,
                quantity_received: item.intQuantityReceived,
                quantity_rejected: item.intQuantityRejected || 0,
                unit_of_measure: item.strUnitOfMeasure,
                rejection_reason: item.strRejectionReason,
              })),
            },
          }),
        } as any,
        include: {
          purchase_order: {
            select: {
              pk_purchase_order_id: true,
              po_number: true,
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
      return ResponseHelper.success(updatedGoodsReceipt, "Goods receipt updated successfully");
    } catch (error) {
      this.logger.error(`${GoodsReceiptProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${GoodsReceiptProperties.service.delete.start}: ${strId}`);
      const goodsReceipt = await this.prisma.tbl_goods_receipt.findUnique({
        where: { pk_goods_receipt_id: strId },
      });

      if (!goodsReceipt) {
        throw new NotFoundException("Goods receipt not found");
      }

      const deletedGoodsReceipt = await this.prisma.tbl_goods_receipt.delete({
        where: { pk_goods_receipt_id: strId },
      });

      this.logger.log(`${GoodsReceiptProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(deletedGoodsReceipt, "Goods receipt deleted successfully");
    } catch (error) {
      this.logger.error(`${GoodsReceiptProperties.service.delete.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
