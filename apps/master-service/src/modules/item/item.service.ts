import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ItemProperties } from '../../common/properties/item.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:item:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:item:${strId}`,
};

@Injectable()
export class ItemService {
  private readonly logger = new AppLogger(ItemService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  async create(strSchemaId: string, createItemDto: CreateItemDto) {
    try {
      this.logger.log(ItemProperties.service.create.start);
      const objPrisma = await this.getSchemaClient();

      const objItem = await objPrisma.tbl_item.create({
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

      this.logger.log(`${ItemProperties.service.create.success}: ${objItem.pk_item_id}`);
      await this.cache.del(CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objItem, 'Item created successfully');
    } catch (error) {
      this.logger.error(ItemProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create item', error.message);
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string; category_id?: string; category_name?: string }) {
    try {
      this.logger.log(ItemProperties.service.findAll.start);

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;
      const offset = (page - 1) * limit;

      const whereClause: any = {};
      if (payload.search) {
        whereClause.OR = [
          { item_name: { contains: payload.search, mode: 'insensitive' } },
          { item_code: { contains: payload.search, mode: 'insensitive' } },
          { hsn_code: { contains: payload.search, mode: 'insensitive' } },
        ];
      }
      if (payload.category_id) whereClause.fk_category_id = payload.category_id;
      if (payload.category_name) {
        whereClause.category = {
          OR: [
            { category_name: { contains: payload.category_name, mode: 'insensitive' } },
            { parent_category: { category_name: { contains: payload.category_name, mode: 'insensitive' } } },
          ],
        };
      }

      const arrItems = await this.cache.getOrSet(
        CACHE_KEYS.all(strSchemaId),
        async () => {
          this.logger.log('[DB Fallback] Fetching all items from database');
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_item.findMany({
            where: { ...whereClause, is_active: true },
            include: { category: { include: { parent_category: true } } },
            skip: offset,
            take: limit,
          });
        },
      );

      const objPrisma = await this.getSchemaClient();
      const total = await objPrisma.tbl_item.count({ where: { ...whereClause, is_active: true } });

      this.logger.log(ItemProperties.service.findAll.success);
      return ResponseHelper.success(
        { items: arrItems, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Items fetched successfully',
      );
    } catch (error) {
      this.logger.error(ItemProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch items', error.message);
    }
  }

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${ItemProperties.service.findOne.start}: ${strId}`);

      const objItem = await this.cache.getOrSet(
        CACHE_KEYS.one(strSchemaId, strId),
        async () => {
          this.logger.log(`[DB Fallback] Fetching item ${strId} from database`);
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_item.findUnique({
            where: { pk_item_id: strId, is_active: true },
            include: { category: true },
          });
        },
      );

      if (!objItem) throw new NotFoundException('Item not found');

      this.logger.log(`${ItemProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objItem, 'Item fetched successfully');
    } catch (error) {
      this.logger.error(`${ItemProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strSchemaId: string, strId: string, dto: UpdateItemDto) {
    try {
      this.logger.log(`${ItemProperties.service.update.start}: ${strId}`);
      const objPrisma = await this.getSchemaClient();

      const objItem = await objPrisma.tbl_item.findUnique({ where: { pk_item_id: strId, is_active: true } });
      if (!objItem) throw new BadRequestException('Item not found');

      const objUpdatedItem = await objPrisma.tbl_item.update({
        where: { pk_item_id: strId },
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

      this.logger.log(`${ItemProperties.service.update.success}: ${strId}`);
      await this.cache.update(CACHE_KEYS.one(strSchemaId, strId), objUpdatedItem, CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objUpdatedItem, 'Item updated successfully');
    } catch (error) {
      this.logger.error(`${ItemProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
