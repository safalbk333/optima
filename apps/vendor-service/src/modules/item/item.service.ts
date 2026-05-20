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

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      this.logger.log(ItemProperties.service.create.start);
      const item = await this.prisma.item.create({
        data: {
          vendor_id: createItemDto.vendorId,
          quotation_id: createItemDto.quotationId,
          item_name: createItemDto.itemName,
          item_code: createItemDto.itemCode,
          description: createItemDto.description,
          quantity: createItemDto.quantity,
          unit: createItemDto.unit,
          documents: createItemDto.document,
        },
      });
      this.logger.log(`${ItemProperties.service.create.success}: ${item.id}`);
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
      const items = await this.prisma.item.findMany();
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
      const item =
        await this.prisma.item.findUnique({
          where: { id },
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