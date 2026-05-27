import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PurchaseRequestController } from './purchase-request.controller';
import { PurchaseRequestGatewayService } from './purchase-request.service';

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
  controllers: [PurchaseRequestController],
  providers: [PurchaseRequestGatewayService],
  exports: [PurchaseRequestGatewayService],
})
export class PurchaseRequestModule {}
