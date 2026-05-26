import { Module } from '@nestjs/common';
import { PurchaseRequestController } from './purchase-request.controller';
import { PurchaseRequestGatewayService } from './purchase-request.service';

@Module({
  controllers: [PurchaseRequestController],
  providers: [PurchaseRequestGatewayService],
  exports: [PurchaseRequestGatewayService],
})
export class PurchaseRequestModule {}
