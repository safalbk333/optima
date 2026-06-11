import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderGatewayService } from './purchase-order.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REQUEST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.REQUEST_SERVICE_HOST || 'localhost',
          port: Number(process.env.REQUEST_SERVICE_PORT) || 3007,
        },
      },
    ]),
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderGatewayService],
  exports: [PurchaseOrderGatewayService],
})
export class PurchaseOrderModule {}
