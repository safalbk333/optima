import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { ApprovalLevelService } from './approval.service';
import { CreateApprovalLevelDto, UpdateApprovalLevelDto } from './dto/approval.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ApprovalLevelProperties } from '../../common/properties/approval-level.properties';

@Controller()
export class ApprovalLevelController {
  private readonly logger = new AppLogger(ApprovalLevelController.name);

  constructor(
    private readonly approvalLevelService: ApprovalLevelService,
  ) {
    this.logger.log(ApprovalLevelProperties.controller.start);
  }

  @MessagePattern('approvalLevel.create')
  create(
    @Payload() data: CreateApprovalLevelDto,
  ) {
    this.logger.log(ApprovalLevelProperties.controller.create);
    return this.approvalLevelService.create(data);
  }

  @MessagePattern('approvalLevel.findAll')
  findAll() {
    this.logger.log(ApprovalLevelProperties.controller.findAll);
    return this.approvalLevelService.findAll();
  }

  @MessagePattern('approvalLevel.findOne')
  findOne(@Payload() level: string) {
    this.logger.log(`${ApprovalLevelProperties.controller.findOne}: ${level}`);
    return this.approvalLevelService.findOne(level);
  }

  @MessagePattern('approvalLevel.update')
  update(
    @Payload()
    payload: {
      id: string;
      data: UpdateApprovalLevelDto;
    },
  ) {
    this.logger.log(`${ApprovalLevelProperties.controller.update}: ${payload.id}`);
    return this.approvalLevelService.update(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern('approvalLevel.delete')
  delete(@Payload() id: string) {
    this.logger.log(`${ApprovalLevelProperties.controller.delete}: ${id}`);
    return this.approvalLevelService.delete(id);
  }
}
