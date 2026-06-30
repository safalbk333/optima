import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { COMPANY_PATTERN } from './company.pattern';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(CompanyGatewayService.name);
  }

  async create(data: CreateCompanyDto) {
    try {
      return await firstValueFrom(
        this.client.send(COMPANY_PATTERN.CREATE, data),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(COMPANY_PATTERN.FIND_ALL, payload),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(COMPANY_PATTERN.FIND_ONE, { id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, data: UpdateCompanyDto) {
    try {
      return await firstValueFrom(
        this.client.send(COMPANY_PATTERN.UPDATE, { id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
