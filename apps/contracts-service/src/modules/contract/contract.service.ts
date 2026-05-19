import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '.././../../../../libs/database/prisma-service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AppLogger } from '../../common/logger/app.logger';

@Injectable()
export class ContractService {
  private readonly logger = new AppLogger(ContractService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll() {
    try {
      this.logger.log('Fetching all contracts');
      const contracts = await this.prisma.contract.findMany();
      this.logger.log(`Found ${contracts.length} contracts`);
      return contracts;
    } catch (error) {
      this.logger.error(
        'Failed to fetch all contracts',
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Fetching contract with id: ${id}`);
      const contract =
        await this.prisma.contract.findUnique({
          where: { id },
        });

      if (!contract) {
        throw new NotFoundException(
          'Contract not found',
        );
      }

      this.logger.log(`Contract found with id: ${id}`);
      return contract;
    } catch (error) {
      this.logger.error(
        `Failed to fetch contract with ID: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(data: CreateContractDto) {
    try {
      this.logger.log('Creating new contract');
      const contract = await this.prisma.contract.create({
        data,
      });
      this.logger.log(`Contract created with id: ${contract.id}`);
      return contract;
    } catch (error) {
      this.logger.error(
        'Failed to create contract',
        error.stack,
      );
      throw error;
    }
  }

  async update(
    id: string,
    data: UpdateContractDto,
  ) {
    try {
      this.logger.log(`Updating contract with id: ${id}`);
      const contract =
        await this.prisma.contract.findUnique({
          where: { id },
        });

      if (!contract) {
        throw new NotFoundException(
          'Contract not found',
        );
      }

      const updatedContract = await this.prisma.contract.update({
        where: { id },
        data,
      });
      this.logger.log(`Contract updated with id: ${id}`);
      return updatedContract;
    } catch (error) {
      this.logger.error(
        `Failed to update contract with ID: ${id}`,
        error.stack,
      );
      throw error;
    }
  }
}
