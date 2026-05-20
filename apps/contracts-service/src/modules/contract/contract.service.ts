import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'libs/database/prisma-service';

import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ContractProperties } from '../../common/properties/contract.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class ContractService {
  private readonly logger = new AppLogger(ContractService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    try {
      this.logger.log(ContractProperties.service.findAll.start);

      const arrContracts =
        await this.prisma.contract.findMany();

      this.logger.log(
        `${ContractProperties.service.findAll.success}: ${arrContracts.length}`,
      );

      return ResponseHelper.success(
        arrContracts,
        'Contracts fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        ContractProperties.service.findAll.error,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to fetch contracts',
        error.message,
      );
    }
  }

  async findOne(strId: string) {
    try {
      this.logger.log(
        `${ContractProperties.service.findOne.start}: ${strId}`,
      );

      const objContract =
        await this.prisma.contract.findUnique({
          where: { id: strId },
        });

      if (!objContract) {
        throw new NotFoundException(
          'Contract not found',
        );
      }

      this.logger.log(
        `${ContractProperties.service.findOne.success}: ${strId}`,
      );

      return ResponseHelper.success(
        objContract,
        'Contract fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        `${ContractProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to fetch contract',
        error.message,
      );
    }
  }

  async create(objData: CreateContractDto) {
    try {
      this.logger.log(
        ContractProperties.service.create.start,
      );

      const objContract =
        await this.prisma.contract.create({
          data: objData,
        });

      this.logger.log(
        `${ContractProperties.service.create.success}: ${objContract.id}`,
      );

      return ResponseHelper.success(
        objContract,
        'Contract created successfully',
      );
    } catch (error) {
      this.logger.error(
        ContractProperties.service.create.error,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to create contract',
        error.message,
      );
    }
  }

  async update(
    strId: string,
    objData: UpdateContractDto,
  ) {
    try {
      this.logger.log(
        `${ContractProperties.service.update.start}: ${strId}`,
      );

      const objContract =
        await this.prisma.contract.findUnique({
          where: { id: strId },
        });

      if (!objContract) {
        throw new NotFoundException(
          'Contract not found',
        );
      }

      const objUpdatedContract =
        await this.prisma.contract.update({
          where: { id: strId },
          data: objData,
        });

      this.logger.log(
        `${ContractProperties.service.update.success}: ${strId}`,
      );

      return ResponseHelper.success(
        objUpdatedContract,
        'Contract updated successfully',
      );
    } catch (error) {
      this.logger.error(
        `${ContractProperties.service.update.error}: ${strId}`,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to update contract',
        error.message,
      );
    }
  }
}