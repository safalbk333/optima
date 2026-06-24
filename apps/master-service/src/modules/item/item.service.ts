import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateItemDto } from './dto/create-item.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ItemProperties } from '../../common/properties/item.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';


@Injectable()
export class ItemService {
  private readonly logger = new AppLogger(ItemService.name);
  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(createItemDto: CreateItemDto) {
    try {
      this.logger.log(ItemProperties.service.create.start);
      const prisma =
        await this.getSchemaClient();

      const item = await prisma.tbl_item.create({
        data: {
          item_name: createItemDto.strItemName,
          item_code: createItemDto.strItemCode,
          description: createItemDto.strDescription,
          fk_category_id: createItemDto.strCategoryId,
          unit: createItemDto.strUnit,
          documents: createItemDto.strDocuments,
        },
      });
      this.logger.log(`${ItemProperties.service.create.success}: ${item.pk_item_id}`);
      return ResponseHelper.success(
        item,
        'Item created successfully',
      );
    } catch (error) {
      this.logger.error(
        ItemProperties.service.create.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to create item',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      this.logger.log(ItemProperties.service.findAll.start);
      const prisma =
        await this.getSchemaClient();

      const items = await prisma.tbl_item.findMany({
        include: {
          category: true,
        },
      });
      this.logger.log(ItemProperties.service.findAll.success);
      return ResponseHelper.success(
        items,
        'Items fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        ItemProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to fetch items',
        error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${ItemProperties.service.findOne.start}: ${id}`);
      const prisma =
        await this.getSchemaClient();

      const item = await prisma.tbl_item.findUnique({
        where: { pk_item_id: id },
        include: {
          category: true,
        },
      });

      if (!item) {
        throw new NotFoundException(
          'Item not found',
        );
      }
      this.logger.log(`${ItemProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(
        item,
        'Item fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        `${ItemProperties.service.findOne.error}: ${id}`,
        error.stack,
      );
      throw error;
    }
  }
}
