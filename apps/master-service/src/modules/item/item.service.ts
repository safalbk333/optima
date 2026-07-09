import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ItemProperties } from '../../common/properties/item.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import * as XLSX from 'xlsx';

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


  async bulkUpload(payload: any) {
    try {
      if (!payload) {
        throw new BadRequestException('No file uploaded');
      }

      const prisma = await this.getSchemaClient();

      // File Validation
      const fileName = payload.originalname.toLowerCase();

      if (
        !fileName.endsWith('.xlsx') &&
        !fileName.endsWith('.csv')
      ) {
        throw new BadRequestException(
          'Only .xlsx and .csv files are supported.',
        );
      }

      const buffer = Buffer.from(payload.buffer.data);

      const workbook = XLSX.read(buffer, {
        type: 'buffer',
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet, {
        defval: '',
      });

      if (!rows.length) {
        throw new BadRequestException(
          'Uploaded file is empty.',
        );
      }

      if (rows.length > 10000) {
        throw new BadRequestException(
          'Maximum 10000 rows allowed.',
        );
      }

      // Cache DB Data
      const categories =
        await prisma.tbl_category.findMany({
          select: {
            pk_category_id: true,
          },
        });

      const categorySet = new Set(
        categories.map(
          (x) => x.pk_category_id,
        ),
      );

      const existingItems =
        await prisma.tbl_item.findMany({
          select: {
            item_code: true,
          },
        });

      const existingItemCodes = new Set(
        existingItems.map(
          (x) => x.item_code,
        ),
      );

      // Row Validation
      const uploadItemCodes = new Set();

      const validRows = [];
      const failedRows = [];

      for (
        let index = 0;
        index < rows.length;
        index++
      ) {
        const row = rows[index];

        const errors = [];

        // Required Fields
        if (!row['Item Name'])
          errors.push({
            field: 'Item Name',
            reason: 'Item Name is required',
          });

        if (!row['Item Code'])
          errors.push({
            field: 'Item Code',
            reason: 'Item Code is required',
          });

        if (!row['Category Id'])
          errors.push({
            field: 'Category Id',
            reason: 'Category Id is required',
          });

        // Integer Validation
        if (
          row['HSN Code'] &&
          !/^\d{4}$|^\d{6}$|^\d{8}$/.test(
            String(row['HSN Code']).trim(),
          )
        ) {
          errors.push({
            field: 'HSN Code',
            reason: 'HSN Code must be 4, 6, or 8 digits',
          });
        }

        // Boolean Validation
        if (
          row['RC Flag'] !== '' &&
          ![
            true,
            false,
            'true',
            'false',
            'TRUE',
            'FALSE',
          ].includes(row['RC Flag'])
        ) {
          errors.push({
            field: 'RC Flag',
            reason: 'RC Flag should be TRUE/FALSE',
          });
        }

        // Foreign Key
        if (
          row['Category Id'] &&
          !categorySet.has(
            row['Category Id'],
          )
        ) {
          errors.push({
            field: 'Category Id',
            reason: 'Invalid Category Id',
          });
        }

        // Duplicate inside uploaded file
        if (
          uploadItemCodes.has(
            row['Item Code'],
          )
        ) {
          errors.push({
            field: 'Item Code',
            reason: 'Duplicate Item Code in uploaded file',
          });
        } else {
          uploadItemCodes.add(
            row['Item Code'],
          );
        }

        // Duplicate in DB
        if (
          existingItemCodes.has(
            row['Item Code'],
          )
        ) {
          errors.push({
            field: 'Item Code',
            reason: 'Item Code already exists',
          });
        }

        if (errors.length) {
          failedRows.push({
            rowNumber: index + 2,
            data: row,
            errors,
          });
          continue;
        }

        validRows.push({
          item_name: row['Item Name'],
          item_code: row['Item Code'],
          fk_category_id:
            row['Category Id'],
          unit: row['Unit'],
          rc_flag:
            String(
              row['RC Flag'],
            ).toLowerCase() === 'true',
          hsn_code: row['HSN Code']
            ? String(
              row['HSN Code'],
            )
            : null,
          description:
            row['Description'] ||
            null,
          documents:
            row['Documents'] ||
            null,
        });
      }

      // Transaction
      let inserted = 0;

      if (validRows.length) {
        await prisma.$transaction(
          async (tx) => {
            const result =
              await tx.tbl_item.createMany({
                data: validRows,
              });

            inserted =
              result.count;
          },
        );
      }

      let errorReportBuffer: Buffer | null = null;

      if (failedRows.length) {
        const errorRows = [];

        failedRows.forEach((failed) => {
          failed.errors.forEach((error) => {
            errorRows.push({
              'Row Number': failed.rowNumber,
              Field: error.field,
              Reason: error.reason,
            });
          });
        });

        const worksheet = XLSX.utils.json_to_sheet(errorRows);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          'Validation Errors',
        );

        errorReportBuffer = XLSX.write(workbook, {
          type: 'buffer',
          bookType: 'xlsx',
        });
      }

      return {
        success: true,
        totalRows: rows.length,
        inserted,
        failed: failedRows.length,
        fileName:
          failedRows.length > 0
            ? 'Item_Bulk_Upload_Errors.xlsx'
            : null,
        errorReport: errorReportBuffer
          ? errorReportBuffer.toString('base64')
          : null,
      };
    } catch (error) {
      this.logger.error(
        error.message,
        error,
      );
      throw error;
    }
  }

  // async bulkUpload(payload: any) {
  //   try {
  //     if (!payload) {
  //       throw new BadRequestException('No file uploaded');
  //     }

  //     const prisma = await this.getSchemaClient();

  //     const buffer = Buffer.from(payload.buffer.data);
  //     const workbook = XLSX.read(buffer, {
  //       type: 'buffer',
  //     });

  //     const sheet = workbook.Sheets[workbook.SheetNames[0]];

  //     const rows = XLSX.utils.sheet_to_json(sheet, {
  //       defval: '',
  //     });

  //     if (!rows.length) {
  //       throw new BadRequestException('Excel file is empty');
  //     }

  //     const itemData = rows.map((row) => ({
  //       item_name: row['Item Name'],
  //       item_code: row['Item Code'],
  //       fk_category_id: row['Category Id'],
  //       unit: row['Unit'],
  //       rc_flag: row['RC Flag'],
  //       hsn_code: row['HSN Code']
  //         ? String(row['HSN Code'])
  //         : null,
  //       description: row['Description'],
  //       documents: row['Documents'],
  //     }));

  //     const itemCodes = itemData.map(item => item.item_code);

  //     const existingItems = await prisma.tbl_item.findMany({
  //       where: {
  //         item_code: {
  //           in: itemCodes,
  //         },
  //       },
  //       select: {
  //         item_code: true,
  //       },
  //     });

  //     const existingCodes = new Set(
  //       existingItems.map(item => item.item_code),
  //     );

  //     const newItems = itemData.filter(
  //       item => !existingCodes.has(item.item_code),
  //     );

  //     if (!newItems.length) {
  //       throw new BadRequestException(
  //         'All items in the uploaded file already exist.',
  //       );
  //     }

  //     const result = await prisma.tbl_item.createMany({
  //       data: newItems,
  //       // skipDuplicates: true,
  //     });

  //     return {
  //       success: true,
  //       totalRows: itemData.length,
  //       inserted: result.count,
  //       skipped: existingItems.length,
  //       skippedItems: [...existingCodes],
  //     };
  //   } catch (error) {
  //     this.logger.error(error.message, error);
  //     throw error;
  //   }
  // }

}
