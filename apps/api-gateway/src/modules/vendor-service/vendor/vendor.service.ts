import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { VENDOR_PATTERN } from './vendor.pattern';
import { Multer } from 'multer';

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

  async create(data: CreateVendorDto) {
    try {
      return await firstValueFrom(
        this.client.send(
          'vendor.create',
          data,
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

  // async bulkUpload(file: Multer.File) {
  //   try {
  //     const result = firstValueFrom(
  //       this.client.send(
  //         VENDOR_PATTERN.UPLOAD,
  //         // { cmd: 'vendor.bulkUpload' },
  //         {
  //           originalname: file.originalname,
  //           mimetype: file.mimetype,
  //           buffer: file.buffer,
  //         },
  //       ),
  //     );
  //     if (result.errorReport) {
  //       result.errorReport = Buffer.from(
  //         result.errorReport,
  //         'base64',
  //       );
  //     }

  //     return result;
  //   } catch (error) {
  //     this.logger.error(error.message, error);
  //     throw error;
  //   }
  // }
}