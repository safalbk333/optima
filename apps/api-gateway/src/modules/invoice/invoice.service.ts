import {
  Inject,
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoiceGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('SHIPMENT_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(InvoiceGatewayService.name);
  }

  async create(data: CreateInvoiceDto) {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestException('Invoice data is required');
      }

      return await firstValueFrom(
        this.client.send('invoice.create', data),
      );
    } catch (error) {
      const errMsg = error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error));
      this.logger.error(
        `Failed to create invoice: ${errMsg}`,
        error?.stack,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to create invoice. ${errMsg}`,
      );
    }
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
    search?: string,
  ) {
    try {
      if (skip < 0) {
        throw new BadRequestException('Skip value must be greater than or equal to 0');
      }

      if (take <= 0 || take > 100) {
        throw new BadRequestException('Limit must be between 1 and 100');
      }

      const payload = {
        skip,
        take,
        ...(search && search.trim() && { search: search.trim() }),
      };

      return await firstValueFrom(
        this.client.send('invoice.findAll', payload),
      );
    } catch (error) {
      const errMsg = error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error));
      this.logger.error(
        `Failed to fetch invoices: ${errMsg}`,
        error?.stack,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to fetch invoices. ${errMsg}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('Invoice ID is required');
      }

      return await firstValueFrom(
        this.client.send('invoice.findOne', { id }),
      );
    } catch (error) {
      const errMsg = error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error));
      this.logger.error(
        `Failed to fetch invoice ${id}: ${errMsg}`,
        error?.stack,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to fetch invoice. ${errMsg}`,
      );
    }
  }

  async update(id: string, data: UpdateInvoiceDto) {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('Invoice ID is required');
      }

      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestException('At least one field must be updated');
      }

      return await firstValueFrom(
        this.client.send('invoice.update', { id, data }),
      );
    } catch (error) {
      const errMsg = error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error));
      this.logger.error(
        `Failed to update invoice ${id}: ${errMsg}`,
        error?.stack,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to update invoice. ${errMsg}`,
      );
    }
  }

  async markAsPaid(id: string) {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('Invoice ID is required');
      }

      return await firstValueFrom(
        this.client.send('invoice.markAsPaid', { id }),
      );
    } catch (error) {
      const errMsg = error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error));
      this.logger.error(
        `Failed to mark invoice ${id} as paid: ${errMsg}`,
        error?.stack,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to mark invoice as paid. ${errMsg}`,
      );
    }
  }

  async remove(id: string) {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('Invoice ID is required');
      }

      return await firstValueFrom(
        this.client.send('invoice.remove', { id }),
      );
    } catch (error) {
      const errMsg = error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error));
      this.logger.error(
        `Failed to delete invoice ${id}: ${errMsg}`,
        error?.stack,
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to delete invoice. ${errMsg}`,
      );
    }
  }

  async findByVendorId(
  vendorId: string,
  skip = 0,
  take = 10,
) {
  return firstValueFrom(
    this.client.send(
      'invoice.findByVendorId',
      {
        vendorId,
        skip,
        take,
      },
    ),
  );
}
}
