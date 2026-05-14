import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller()
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
  ) {}

  @MessagePattern('contract.findAll')
  findAll() {
    return this.contractService.findAll();
  }

  @MessagePattern('contract.findOne')
  findOne(@Payload() id: string) {
    return this.contractService.findOne(id);
  }

  @MessagePattern('contract.create')
  create(@Payload() data: CreateContractDto) {
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
    return this.contractService.update(
      payload.id,
      payload.data,
    );
  }
}
