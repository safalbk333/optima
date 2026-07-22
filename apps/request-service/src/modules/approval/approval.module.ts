import { Module } from '@nestjs/common';
import { ApprovalLevelController } from './approval.controller';
import { ApprovalLevelService } from './approval.service';

@Module({
  controllers: [ApprovalLevelController],

  providers: [ApprovalLevelService],

  exports: [ApprovalLevelService],
})
export class ApprovalModule { }
