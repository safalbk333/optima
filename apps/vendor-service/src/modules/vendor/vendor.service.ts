import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { VendorProperties } from '../../common/properties/vendor.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { Vendor_status } from '../constant/enum';
import * as XLSX from 'xlsx';
import { Multer } from 'multer';
import { UploadVendorDocumentDto } from './dto/upload-document.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VendorService {
  private readonly logger = new AppLogger(VendorService.name);
  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    category_id?: string;
    category_name?: string;
  }) {
    try {
      const prisma =
        await this.getSchemaClient();

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
          { company_legal_name: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const where = {
        ...whereClause,
        status: {
          notIn: ['BACKLISTED', 'INACTIVE'],
        },
      };

      const [vendors, total] = await Promise.all([
        prisma.tbl_vendor.findMany({
          where,
          skip: offset,
          take: limit,
        }),
        prisma.tbl_vendor.count({
          where,
        }),
      ]);

      return ResponseHelper.success(
        {
          vendors,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        'Vendors fetched successfully',
      );
    } catch (error) {
      return ResponseHelper.error(
        error.message,
      );
    }
  }

  async findOne(vendor_id: string) {
    try {
      const prisma =
        await this.getSchemaClient();

      const vendor =
        await prisma.tbl_vendor.findUnique({
          where: {
            pk_vendor_id: vendor_id,
          },
        });

      if (!vendor) {
        throw new NotFoundException(
          'Vendor not found',
        );
      }

      return ResponseHelper.success(
        vendor,
        'Vendor fetched successfully',
      );
    } catch (error) {
      return ResponseHelper.error(
        error.message,
      );
    }
  }

  async create(
    createVendorDto: CreateVendorDto,
  ) {
    try {
      const prisma =
        await this.getSchemaClient();

      const existingVendor = await prisma.tbl_vendor.findFirst({
        where: {
          OR: [{
            GST_number: createVendorDto.GST_number,
          },
          {
            PAN_number: createVendorDto.PAN_number,
          },
          ],
        },
      });

      if (existingVendor) {
        if (
          existingVendor.GST_number === createVendorDto.GST_number
        ) {
          throw new NotFoundException(
            'Vendor with this GST Number already exists.',
          );
        }

        if (
          existingVendor.PAN_number === createVendorDto.PAN_number
        ) {
          throw new NotFoundException(
            'Vendor with this PAN Number already exists.',
          );
        }
      }

      const currentYear = new Date().getFullYear();

      if (
        createVendorDto.year_of_establishment < 1800 ||
        createVendorDto.year_of_establishment > currentYear
      ) {
        throw new BadRequestException(
          `Year of establishment must be a year`,
        );
      }

      const vendor =
        await prisma.tbl_vendor.create({
          data: {
            company_legal_name:
              createVendorDto.company_legal_name,
            trading_name:
              createVendorDto.trading_name,
            company_type:
              createVendorDto.company_type,
            year_of_establishment:
              createVendorDto.year_of_establishment,
            office_address:
              createVendorDto.office_address,
            GST_number:
              createVendorDto.GST_number,
            PAN_number:
              createVendorDto.PAN_number,
            MSME_status:
              createVendorDto.MSME_status,
            bank:
              createVendorDto.bank,
            nature_of_business:
              createVendorDto.nature_of_business,
            categories_of_supply:
              createVendorDto.categories_of_supply,
            contact_person:
              createVendorDto.contact_person,
            email:
              createVendorDto.email,
            phone:
              createVendorDto.phone,
            fk_country_id:
              createVendorDto.fk_country_id,
            fk_city_id:
              createVendorDto.fk_city_id,
            status:
              createVendorDto.status,
          },
        });

      return ResponseHelper.success(
        vendor,
        'Vendor created successfully',
      );
    } catch (error) {
      return ResponseHelper.error(
        error.message,
      );
    }
  }

  async update(vendorId: string, dto: UpdateVendorDto) {
    try {
      this.logger.log(`${VendorProperties.service.update}: ${vendorId}`);
      const prisma = await this.getSchemaClient();

      const vendor = await prisma.tbl_vendor.findUnique({
        where: {
          pk_vendor_id: vendorId,
        },
      });

      if (!vendor) {
        throw new BadRequestException('Vendor not found');
      }

      const vendor_data = await prisma.tbl_vendor.update({
        where: { pk_vendor_id: vendorId },
        data: {
          company_legal_name: dto.company_legal_name,
          trading_name: dto.trading_name,
          company_type: dto.company_type,
          year_of_establishment: dto.year_of_establishment,
          office_address: dto.office_address,
          GST_number: dto.GST_number,
          PAN_number: dto.PAN_number,
          MSME_status: dto.MSME_status,
          bank: dto.bank,
          nature_of_business: dto.nature_of_business,
          categories_of_supply: dto.categories_of_supply,
          contact_person: dto.contact_person,
          email: dto.email,
          phone: dto.phone,
          fk_country_id: dto.fk_country_id,
          fk_city_id: dto.fk_city_id,
          status: dto.status,
          notes: dto.notes
        },
      });

      return ResponseHelper.success(vendor_data, 'Vendor updated successfully');
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      throw error;
    }
  }

  async bulkUpload(payload: any) {
    try {
      if (!payload) {
        throw new BadRequestException('No file uploaded');
      }

      const prisma = await this.getSchemaClient();

      // File validation
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
        throw new BadRequestException('Uploaded file is empty.');
      }

      if (rows.length > 10000) {
        throw new BadRequestException(
          'Maximum 10,000 rows allowed.',
        );
      }

      // Cache DB Data
      const countries = await prisma.tbl_country.findMany({
        select: {
          pk_country_id: true,
        },
      });

      const countrySet = new Set(
        countries.map((x) => x.pk_country_id),
      );

      const cities = await prisma.tbl_city.findMany({
        select: {
          pk_city_id: true,
        },
      });

      const citySet = new Set(
        cities.map((x) => x.pk_city_id),
      );

      const existingVendors =
        await prisma.tbl_vendor.findMany({
          select: {
            GST_number: true,
            PAN_number: true,
            email: true,
          },
        });

      const existingGST = new Set(
        existingVendors.map((x) => x.GST_number),
      );

      const existingPAN = new Set(
        existingVendors.map((x) => x.PAN_number),
      );

      const existingEmails = new Set(
        existingVendors.map((x) => x.email),
      );

      // Upload duplicate tracking
      const uploadedGST = new Set<string>();
      const uploadedPAN = new Set<string>();
      const uploadedEmails = new Set<string>();

      const validRows = [];
      const failedRows = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        const errors = [];

        // Required fields
        if (!row['Company Legal Name'])
          errors.push({
            field: 'Company Legal Name',
            reason: 'Company Legal Name is required',
          });

        if (!row['Contact Person'])
          errors.push({
            field: 'Contact Person',
            reason: 'Contact Person is required',
          });

        if (!row['Email'])
          errors.push({
            field: 'Email',
            reason: 'Invalid Email format',
          });

        if (!row['Phone'])
          errors.push({
            field: 'Phone',
            reason: 'Phone is required',
          });

        if (!row['Company Type'])
          errors.push({
            field: 'Company Type',
            reason: 'Company Type is required',
          });

        if (!row['Year Of Establishment'])
          errors.push({
            field: 'Year Of Establishment',
            reason: 'Year Of Establishment is required',
          });

        if (!row['Office Address'])
          errors.push({
            field: 'Office Address',
            reason: 'Office Address is required',
          });

        if (!row['GST Number'])
          errors.push({
            field: 'GST Number',
            reason: 'GST Number already exists',
          });

        if (!row['PAN Number'])
          errors.push({
            field: 'PAN Number',
            reason: 'PAN Number is required',
          });

        if (!row['MSME Status'])
          errors.push({
            field: 'MSME Status',
            reason: 'MSME Status is required',
          });

        if (!row['Bank'])
          errors.push({
            field: 'Bank',
            reason: 'Bank is required',
          });

        if (!row['Nature of Business'])
          errors.push({
            field: 'Nature of Business',
            reason: 'Nature of Business is required',
          });

        if (!row['Categories of Supply'])
          errors.push({
            field: 'Categories of Supply',
            reason: 'Categories of Supply is required',
          });

        if (!row['Country Id'])
          errors.push({
            field: 'Country Id',
            reason: 'Country Id is required',
          });

        if (!row['City Id'])
          errors.push({
            field: 'City Id',
            reason: 'City Id is required',
          });

        if (!row['Status'])
          errors.push({
            field: 'Status',
            reason: 'Status is required',
          });

        // Email validation
        if (
          row['Email'] &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            row['Email'],
          )
        ) {
          errors.push({
            field: 'Email',
            reason: 'Invalid Email format',
          });
        }

        // Year validation
        const year = Number(
          row['Year Of Establishment'],
        );

        if (
          row['Year Of Establishment'] &&
          (isNaN(year) ||
            year < 1800 ||
            year > new Date().getFullYear())
        ) {
          errors.push({
            field: 'Year Of Establishment',
            reason: 'Invalid Year Of Establishment',
          });
        }

        // GST Validation
        if (
          row['GST Number'] &&
          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(
            String(row['GST Number']).toUpperCase(),
          )
        ) {
          errors.push({
            field: 'GST Number',
            reason: 'Invalid GST Number',
          });
        }

        // PAN Validation
        if (
          row['PAN Number'] &&
          !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
            String(row['PAN Number']).toUpperCase(),
          )
        ) {
          errors.push({
            field: 'PAN Number',
            reason: 'Invalid PAN Number',
          });
        }

        // Foreign key validation
        if (
          row['Country Id'] &&
          !countrySet.has(row['Country Id'])
        ) {
          errors.push({
            field: 'Country Id',
            reason: 'Invalid Country Id',
          });
        }

        if (
          row['City Id'] &&
          !citySet.has(row['City Id'])
        ) {
          errors.push({
            field: 'City Id',
            reason: 'Invalid City Id',
          });
        }

        // Duplicate in upload
        if (uploadedGST.has(row['GST Number'])) {
          errors.push({
            field: 'GST Number',
            reason: 'Duplicate GST Number in uploaded file',
          });
        } else {
          uploadedGST.add(row['GST Number']);
        }

        if (uploadedPAN.has(row['PAN Number'])) {
          errors.push({
            field: 'PAN Number',
            reason: 'Duplicate PAN Number in uploaded file',
          });
        } else {
          uploadedPAN.add(row['PAN Number']);
        }

        if (uploadedEmails.has(row['Email'])) {
          errors.push({
            field: 'Email',
            reason: 'Duplicate Email in uploaded file',
          });
        } else {
          uploadedEmails.add(row['Email']);
        }

        // Duplicate in database
        if (existingGST.has(row['GST Number'])) {
          errors.push({
            field: 'GST Number',
            reason: 'GST Number already exists'
          });
        }

        if (existingPAN.has(row['PAN Number'])) {
          errors.push({
            field: 'PAN Number',
            reason: 'PAN Number already exists'
          });
        }

        if (existingEmails.has(row['Email'])) {
          errors.push({
            field: 'Email',
            reason: 'Email already exists'
          });
        }

        if (errors.length) {
          failedRows.push({
            rowNumber: i + 2,
            data: row,
            errors,
          });
          continue;
        }

        validRows.push({
          company_legal_name: row['Company Legal Name'],
          trading_name: row['Trading Name'] || null,
          contact_person: row['Contact Person'],
          email: row['Email'],
          phone: String(row['Phone'] ?? ''),
          company_type: row['Company Type'],
          year_of_establishment: year,
          office_address: row['Office Address'],
          GST_number: String(row['GST Number'] ?? ''),
          PAN_number: String(row['PAN Number'] ?? ''),
          MSME_status: row['MSME Status'],
          bank: String(row['Bank'] ?? ''),
          nature_of_business:
            row['Nature of Business'],
          categories_of_supply:
            row['Categories of Supply'],
          fk_country_id: row['Country Id'],
          fk_city_id: row['City Id'],
          status: row['Status'],
          notes: row['Notes'] || null,
        });
      }

      let inserted = 0;

      if (validRows.length) {
        await prisma.$transaction(async (tx) => {
          const result =
            await tx.tbl_vendor.createMany({
              data: validRows,
            });
          inserted = result.count;
        });
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
            ? 'Vendor_Bulk_Upload_Errors.xlsx'
            : null,
        errorReport: errorReportBuffer
          ? errorReportBuffer.toString('base64')
          : null,
      };
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async uploadVendorDocument(payload: any) {
    const prisma = await this.getSchemaClient();

    const { vendorId, documentType, file } = payload;

    // Validate vendor
    const vendor = await prisma.tbl_vendor.findUnique({
      where: {
        pk_vendor_id: vendorId,
      },
    });

    if (!vendor) {
      throw new BadRequestException('Vendor not found');
    }

    // Validate file
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only PDF, JPG and PNG files are allowed',
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException(
        'Maximum file size is 5 MB',
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(
      process.cwd(),
      'uploads',
      'vendor-documents',
      vendorId,
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique file name
    const fileName = `${Date.now()}-${file.originalname}`;

    const filePath = path.join(uploadDir, fileName);

    // Save file locally
    const buffer = Buffer.from(file.buffer, 'base64');

    fs.writeFileSync(filePath, buffer);

    // Save metadata in database
    const document = await prisma.tbl_vendor_document.create({
      data: {
        fk_vendor_id: vendorId,
        document_type: documentType,
        file_name: fileName,
        original_file_name: file.originalname,
        file_size: file.size,
        mime_type: file.mimetype,
        file_url: filePath, // or store relative path
      },
    });

    return {
      success: true,
      message: 'Document uploaded successfully',
      data: {
        documentId: document.pk_document_id,
        vendorId,
        documentType,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
        referenceUrl: filePath,
        uploadedAt: document.uploaded_at,
      },
    };
  }
}