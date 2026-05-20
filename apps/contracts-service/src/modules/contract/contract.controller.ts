import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ContractProperties } from '../../common/properties/contract.properties';

@Controller()
export class ContractController {
  private readonly logger = new AppLogger(ContractController.name);

  constructor(
    private readonly contractService: ContractService,
  ) {
    this.logger.log(ContractProperties.controller.start);
  }

  @MessagePattern('contract.findAll')
  findAll() {
    this.logger.log(ContractProperties.controller.findAll);
    return this.contractService.findAll();
  }

  @MessagePattern('contract.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`${ContractProperties.controller.findOne}: ${id}`);
    return this.contractService.findOne(id);
  }

  @MessagePattern('contract.create')
  create(@Payload() data: CreateContractDto) {
    this.logger.log(ContractProperties.controller.create);
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
    this.logger.log(`${ContractProperties.controller.update}: ${payload.id}`);
    return this.contractService.update(
      payload.id,
      payload.data,
    );
  }
}
