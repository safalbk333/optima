import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateVendorAddressDto, CreateVendorBankAccountDto, CreateVendorContactDto, CreateVendorDto, CreateVendorTaxDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { VENDOR_PATTERN } from './vendor.pattern';
import { Multer } from 'multer';
import { UploadVendorDocumentDto } from './dto/upload-document.dto';

@Injectable()
export class VendorGatewayService {
  private readonly logger: Logger;
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(VendorGatewayService.name);
  }

  async findAll(payload: any) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.findAll',
          payload,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.findOne',
          { id },
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, data: UpdateVendorDto) {
    try {
      return await firstValueFrom(
        this.client.send(VENDOR_PATTERN.UPDATE, { id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async bulkUpload(file: Multer.File) {
    try {
      const result = await firstValueFrom(
        this.client.send(VENDOR_PATTERN.UPLOAD, {
          originalname: file.originalname,
          mimetype: file.mimetype,
          buffer: file.buffer,
        }),
      );

      if (result.errorReport) {
        result.errorReport = Buffer.from(
          result.errorReport,
          'base64',
        );
      }

      return result;
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async viewVendorDocument(documentId: string) {
    return await firstValueFrom(
      this.client.send(
        'vendor.documentById.view',
        {
          documentId,
        },
      ),
    );
  }

  async uploadVendorDocument(
    vendorId: string,
    dto: UploadVendorDocumentDto,
    file: Multer.File,
  ) {
    return await firstValueFrom(
      this.client.send(
        VENDOR_PATTERN.UPLOAD_DOCUMENT,
        {
          vendorId,
          documentType: dto.documentType,
          file: {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer.toString('base64'),
          },
        },
      ),
    );
  }

  async viewVendorDocumentByVendorId() {
    const result = await firstValueFrom(
      this.client.send(
        'view.vendor.document',
        {},
      ),
    );

    return result;
  }

  async createVendor(data: CreateVendorDto) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.createVendor',
          data,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async saveVendorAddress(data: CreateVendorAddressDto) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.saveVendorAddress',
          data,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async createVendorContact(
    data: CreateVendorContactDto,
  ) {
    return firstValueFrom(
      this.client.send(
        'vendor.createContact',
        data,
      ),
    );
  }
  async createTaxRegistration(data: CreateVendorTaxDto) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.createTaxRegistration',
          data,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async createBankAccount(data: CreateVendorBankAccountDto) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.createBankAccount',
          data,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async submitVendor(vendorId: string) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.submitVendor',
          {vendorId},
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }


  // async create(data: CreateVendorDto) {
  //   try {
  //     return await firstValueFrom(
  //       this.client.send(
  //         'vendor.create',
  //         data,
  //       ),
  //     );
  //   } catch (error) {
  //     this.logger.error(error.message, error);
  //     throw error;
  //   }
  // }
}