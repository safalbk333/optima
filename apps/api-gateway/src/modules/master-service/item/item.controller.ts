
import { SchemaId } from '../../guards/decorators/schema-id.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { ItemGatewayService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('Item-Service')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 200, description: 'Item created successfully' })
  @ApiBody({ type: CreateItemDto })
  create(
    @SchemaId() schemaId: string,
    @Body() data: CreateItemDto,
  ) {
    return this.itemService.create(schemaId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Item list fetched successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by item name, code or HSN code' })
  @ApiQuery({ name: 'category_id', required: false, type: String })
  @ApiQuery({ name: 'category_name', required: false, type: String })
  findAll(
    @SchemaId() schemaId: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('category_id') category_id?: string,
    @Query('category_name') category_name?: string,
  ) {
    return this.itemService.findAll(schemaId, {
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
      search,
      category_id,
      category_name,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  @ApiResponse({ status: 200, description: 'Item fetched successfully' })
  findOne(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
  ) {
    return this.itemService.findOne(schemaId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  update(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
    @Body() data: UpdateItemDto,
  ) {
    return this.itemService.update(schemaId, id, data);
  }


  @Post('bulk-upload')
  @ApiOperation({ summary: 'Bulk Upload Items' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  // async bulkUpload(
  //   @UploadedFile() file: Multer.File,
  // ) {
  //   return this.itemService.bulkUpload(file);
  // }
  async bulkUpload(
    @UploadedFile() file: any,
  ): Promise<any> {
    const result = await this.itemService.bulkUpload(file);

    if (!result.errorReport) {
      return result;
    }

    return new StreamableFile(result.errorReport, {
      disposition:
        'attachment; filename="Item_Bulk_Upload_Errors.xlsx"',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }
}
