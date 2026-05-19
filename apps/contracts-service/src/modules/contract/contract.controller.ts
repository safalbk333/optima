import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AppLogger } from '../../common/logger/app.logger';

@Controller()
export class ContractController {
  private readonly logger = new AppLogger(ContractController.name);

  constructor(
    private readonly contractService: ContractService,
  ) {}

  @MessagePattern('contract.findAll')
  findAll() {
    this.logger.log('Received request to find all contracts');
    return this.contractService.findAll();
  }

  @MessagePattern('contract.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`Received request to find contract with id: ${id}`);
    return this.contractService.findOne(id);
  }

  @MessagePattern('contract.create')
  create(@Payload() data: CreateContractDto) {
    this.logger.log('Received request to create contract');
    return this.contractService.create(data);
  }

  @MessagePattern('contract.update')
  update(
    @Payload()
    payload: {
      id: string;
      data: UpdateContractDto;
    },
  ) {
    this.logger.log(`Received request to update contract with id: ${payload.id}`);
    return this.contractService.update(
      payload.id,
      payload.data,
    );
  }
}
