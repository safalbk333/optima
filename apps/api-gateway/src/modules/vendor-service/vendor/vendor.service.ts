import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateVendorDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { VENDOR_PATTERN } from './vendor.pattern';

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
}