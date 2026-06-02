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
  private readonly logger =
    new AppLogger(ContractService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    try {
      this.logger.log(
        ContractProperties.service.findAll.start,
      );

      const arrContracts =
        await this.prisma.tbl_contract.findMany();

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
        await this.prisma.tbl_contract.findUnique(
          {
            where: {
              pk_chr_contract_id: strId,
            },
          },
        );

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

async create(
  objData: CreateContractDto,
) {
  try {
    this.logger.log(
      ContractProperties.service.create.start,
    );

    const objContract =
      await this.prisma.tbl_contract.create({
        data: {
          chr_title: objData.title,
          txt_description:
            objData.description,

          dt_start_date: new Date(
            objData.startDate,
          ),

          dt_end_date: new Date(
            objData.endDate,
          ),

          flt_value: objData.value,

          fk_chr_vendor_id:
            objData.vendorId,
        },
      });

    this.logger.log(
      `${ContractProperties.service.create.success}: ${objContract.pk_chr_contract_id}`,
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
      await this.prisma.tbl_contract.findUnique({
        where: {
          pk_chr_contract_id: strId,
        },
      });

    if (!objContract) {
      throw new NotFoundException(
        'Contract not found',
      );
    }

    const objUpdatedContract =
      await this.prisma.tbl_contract.update({
        where: {
          pk_chr_contract_id: strId,
        },

        data: {
          ...(objData.title && {
            chr_title: objData.title,
          }),

          ...(objData.description && {
            txt_description:
              objData.description,
          }),

          ...(objData.startDate && {
            dt_start_date: new Date(
              objData.startDate,
            ),
          }),

          ...(objData.endDate && {
            dt_end_date: new Date(
              objData.endDate,
            ),
          }),

          ...(objData.value && {
            flt_value: objData.value,
          }),

          ...(objData.vendorId && {
            fk_chr_vendor_id:
              objData.vendorId,
          }),
        },
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