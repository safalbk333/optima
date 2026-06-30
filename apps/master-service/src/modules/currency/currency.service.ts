import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CurrencyProperties } from '../../common/properties/currency.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class CurrencyService {
  private readonly logger = new AppLogger(CurrencyService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(dto: CreateCurrencyDto) {
    try {
      this.logger.log(CurrencyProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      const currency = await prisma.tbl_currency.create({
        data: {
          currency_name: dto.currencyName,
          currency_code: dto.currencyCode,
          symbol: dto.symbol,
          description: dto.description,
        },
      });
      this.logger.log(`${CurrencyProperties.service.create.success}: ${currency.pk_currency_id}`);
      return ResponseHelper.success(currency, 'Currency created successfully');
    } catch (error) {
      this.logger.error(CurrencyProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create currency', error.message);
    }
  }

  async findAll() {
    try {
      this.logger.log(CurrencyProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const currencies = await prisma.tbl_currency.findMany({
        where: { is_active: true },
      });
      this.logger.log(CurrencyProperties.service.findAll.success);
      return ResponseHelper.success(currencies, 'Currencies fetched successfully');
    } catch (error) {
      this.logger.error(CurrencyProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch currencies', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${CurrencyProperties.service.findOne.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const currency = await prisma.tbl_currency.findUnique({
        where: { pk_currency_id: id, is_active: true },
      });

      if (!currency) {
        throw new NotFoundException('Currency not found');
      }
      this.logger.log(`${CurrencyProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(currency, 'Currency fetched successfully');
    } catch (error) {
      this.logger.error(`${CurrencyProperties.service.findOne.error}: ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, dto: UpdateCurrencyDto) {
    try {
      this.logger.log(`${CurrencyProperties.service.update.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const existing = await prisma.tbl_currency.findUnique({
        where: { pk_currency_id: id, is_active: true },
      });

      if (!existing) {
        throw new BadRequestException('Currency not found');
      }

      const currency = await prisma.tbl_currency.update({
        where: { pk_currency_id: id },
        data: {
          currency_name: dto.currencyName,
          currency_code: dto.currencyCode,
          symbol: dto.symbol,
          description: dto.description,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });
      this.logger.log(`${CurrencyProperties.service.update.success}: ${id}`);
      return ResponseHelper.success(currency, 'Currency updated successfully');
    } catch (error) {
      this.logger.error(`${CurrencyProperties.service.update.error}: ${id}`, error.stack);
      throw error;
    }
  }
}
