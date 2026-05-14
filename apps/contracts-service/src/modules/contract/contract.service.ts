import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '.././../../../../libs/database/prisma-service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll() {
    return this.prisma.contract.findMany();
  }

  async findOne(id: string) {
    const contract =
      await this.prisma.contract.findUnique({
        where: { id },
      });

    if (!contract) {
      throw new NotFoundException(
        'Contract not found',
      );
    }

    return contract;
  }

  async create(data: CreateContractDto) {
    return this.prisma.contract.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateContractDto,
  ) {
    const contract =
      await this.prisma.contract.findUnique({
        where: { id },
      });

    if (!contract) {
      throw new NotFoundException(
        'Contract not found',
      );
    }

    return this.prisma.contract.update({
      where: { id },
      data,
    });
  }
}
