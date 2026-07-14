import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
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
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VendorGatewayService } from './vendor.service';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { UploadVendorDocumentDto } from './dto/upload-document.dto';

@ApiTags('Vendor-Service')
@Controller('vendor')
export class VendorController {
  constructor(
    private readonly vendorService: VendorGatewayService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new vendor',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vendor created successfully',
  })
  create(@Body() data: CreateVendorDto) {
    return this.vendorService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all vendors',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vendor list fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by Company name',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: ['PENDING', 'ACTIVE', 'BLACKLISTED', 'INACTIVE'],
    description: 'Filter for status',
  })
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const payload = {
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
      search,
      status
    };
    return this.vendorService.findAll(payload);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vendor by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Vendor fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update vendor' })
  @ApiResponse({ status: 200, description: 'Vendor updated successfully' })
  update(@Param('id') id: string, @Body() data: UpdateVendorDto) {
    return this.vendorService.update(id, data);
  }

  @Post('bulk-upload')
  @ApiOperation({ summary: 'Bulk Upload Vendors' })
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
  async bulkUpload(
    @UploadedFile() file: any,
  ): Promise<any> {
    const result = await this.vendorService.bulkUpload(file);

    if (!result.errorReport) {
      return result;
    }

    return new StreamableFile(result.errorReport, {
      disposition:
        'attachment; filename="Vendor_Bulk_Upload_Errors.xlsx"',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  @Post(':vendorId/documents')
  @ApiOperation({ summary: 'Upload Vendor Document' })
  @ApiParam({
    name: 'vendorId',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['documentType', 'file'],
      properties: {
        documentType: {
          type: 'string',
          enum: [
            'GST_CERTIFICATE',
            'PAN_CARD',
            'CIN_CERTIFICATE',
            'BANK_STATEMENT',
            'MOA',
            'AOA',
            'MSME_CERTIFICATE',
            'CANCELLED_CHEQUE',
            'ADDRESS_PROOF',
            'OTHER',
          ],
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, //5MB
      },

      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only PDF, JPG and PNG files are allowed',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadVendorDocument(
    @Param('vendorId') vendorId: string,
    @Body() dto: UploadVendorDocumentDto,
    @UploadedFile() file: Multer.File,
  ) {
    return this.vendorService.uploadVendorDocument(
      vendorId,
      dto,
      file,
    );
  }
}