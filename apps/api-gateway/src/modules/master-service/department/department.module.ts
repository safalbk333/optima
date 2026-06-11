import { Module } from '@nestjs/common';
import { DepartmentGatewayService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentGatewayService],
})
export class DepartmentModule {}
