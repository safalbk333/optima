import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ItemProperties } from '../../common/properties/item.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class ItemService {
  private readonly logger = new AppLogger(ItemService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) { }

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(createItemDto: CreateItemDto) {
    try {
      this.logger.log(ItemProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      const item = await prisma.tbl_item.create({
        data: {
          item_name: createItemDto.itemName,
          item_code: createItemDto.itemCode,
          description: createItemDto.description,
          fk_category_id: createItemDto.categoryId,
          unit: createItemDto.unit,
          rc_flag: createItemDto.rcFlag,
          hsn_code: createItemDto.hsnCode,
          documents: createItemDto.documents,
        },
      });

      this.logger.log(`${ItemProperties.service.create.success}: ${item.pk_item_id}`);
      return ResponseHelper.success(item, 'Item created successfully');
    } catch (error) {
      this.logger.error(ItemProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create item', error.message);
    }
  }

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    category_id?: string;
    category_name?: string;
  }) {
    try {
      this.logger.log(ItemProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const page =
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
          { item_name: { contains: payload.search, mode: 'insensitive' } },
          { item_code: { contains: payload.search, mode: 'insensitive' } },
          { hsn_code: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      if (payload.category_id) {
        whereClause.fk_category_id = payload.category_id;
      }

      if (payload.category_name) {
        whereClause.category = {
          OR: [
            {
              category_name: {
                contains: payload.category_name,
                mode: 'insensitive',
              },
            },
            {
              parent_category: {
                category_name: {
                  contains: payload.category_name,
                  mode: 'insensitive',
                },
              },
            },
          ],
        };
      }

      const [items, total] = await Promise.all([
        prisma.tbl_item.findMany({
          where: { ...whereClause, is_active: true },
          include: {
            category: {
              include: { parent_category: true },
            },
          },
          skip: offset,
          take: limit,
        }),
        prisma.tbl_item.count({
          where: { ...whereClause, is_active: true },
        }),
      ]);

      this.logger.log(ItemProperties.service.findAll.success);
      return ResponseHelper.success(
        {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        'Items fetched successfully',
      );
    } catch (error) {
      this.logger.error(ItemProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch items', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${ItemProperties.service.findOne.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const item = await prisma.tbl_item.findUnique({
        where: { pk_item_id: id, is_active: true },
        include: { category: true },
      });

      if (!item) {
        throw new NotFoundException('Item not found');
      }

      this.logger.log(`${ItemProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(item, 'Item fetched successfully');
    } catch (error) {
      this.logger.error(
        `${ItemProperties.service.findOne.error}: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(itemId: string, dto: UpdateItemDto) {
    try {
      this.logger.log(`${ItemProperties.service.update}: ${itemId}`);
      const prisma = await this.getSchemaClient();

      const item = await prisma.tbl_item.findUnique({
        where: { pk_item_id: itemId, is_active: true },
      });

      if (!item) {
        throw new BadRequestException('Item not found');
      }

      const item_data = await prisma.tbl_item.update({
        where: { pk_item_id: itemId },
        data: {
          item_name: dto.itemName,
          item_code: dto.itemCode,
          description: dto.description,
          fk_category_id: dto.categoryId,
          unit: dto.unit,
          rc_flag: dto.rcFlag,
          hsn_code: dto.hsnCode,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });

      return ResponseHelper.success(item_data, 'Item updated successfully');
    } catch (error) {
      this.logger.error(
        `${ItemProperties.service.findOne.error}: ${itemId}`,
        error.stack,
      );
      throw error;
    }
  }
}