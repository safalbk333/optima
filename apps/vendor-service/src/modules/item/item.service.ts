import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateItemDto } from './dto/create-item.dto';


@Injectable()
export class ItemService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

   async create(createItemDto: CreateItemDto) {
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
  }
  async findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: string) {
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
  }
}