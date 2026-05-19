import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateItemDto } from './dto/create-item.dto';


@Injectable()
export class ItemService {
  private readonly logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
  ) {
    this.logger = new Logger(ItemService.name);
  }

  async create(createItemDto: CreateItemDto) {
    try {
      return this.prisma.item.create({
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
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
  async findAll() {
    try {
      return this.prisma.item.findMany();
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item =
        await this.prisma.item.findUnique({
          where: { id },
        });

      if (!item) {
        throw new NotFoundException(
          'Item not found',
        );
      }
      return item;
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}