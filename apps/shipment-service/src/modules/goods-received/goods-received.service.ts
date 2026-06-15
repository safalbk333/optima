import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { AppLogger } from '../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { GoodsReceivedProperties } from '../../common/properties/goods-received.properties';
import { GoodsReceived_status } from '../constant/enum';


@Injectable()
export class GoodsReceivedService {
  private readonly logger = new AppLogger(GoodsReceivedService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    status?: string;
    warehouse?: string;
  }) {
    try {
      this.logger.log(GoodsReceivedProperties.service.findAll.start);
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
            po_no: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
          {
            asn_id: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
          {
            id: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
        ];
      }

      if (payload.status) {
        const statusKey = payload.status.toUpperCase() as keyof typeof GoodsReceived_status;

        const statusValue = GoodsReceived_status[statusKey];

        if (!statusValue) {
          throw new Error('Invalid goods received status');
        }

        whereClause.status = statusValue;
      }

      if (payload.warehouse) {
        whereClause.warehouse = {
          contains: payload.warehouse,
          mode: 'insensitive',
        };
      }

      const goodsReceiveds = await this.prisma.tbl_goods_receipt.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
      });
      if (!goodsReceiveds) {
        throw new NotFoundException(
          'No goods received found',
        );
      }
      this.logger.log(GoodsReceivedProperties.service.findAll.success);
      return ResponseHelper.success(
        goodsReceiveds,
        'Goods received list fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        GoodsReceivedProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to fetch goods received',
        error.message,
      );
    }
  }

  async findOne(goods_received_id: string) {
    try {
      this.logger.log(`${GoodsReceivedProperties.service.findOne.start}: ${goods_received_id}`);
      const goodsReceived =
        await this.prisma.tbl_goods_receipt.findUnique({
          where: { pk_goods_receipt_id: goods_received_id },
          // include: {
          //   tracking: true,
          // },
        });

      if (!goodsReceived) {
        throw new NotFoundException(
          'Goods received not found',
        );
      }
      this.logger.log(`${GoodsReceivedProperties.service.findOne.success}: ${goods_received_id}`);
      return ResponseHelper.success(
        goodsReceived,
        'Goods received fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        `${GoodsReceivedProperties.service.findOne.error}: ${goods_received_id}`,
        error.stack,
      );
      throw error;
    }
  }
}