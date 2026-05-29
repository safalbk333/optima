import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GoodsReceiptController } from './goods-receipt.controller';
import { GoodsReceiptGatewayService } from './goods-receipt.service';

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
  controllers: [GoodsReceiptController],
  providers: [GoodsReceiptGatewayService],
  exports: [GoodsReceiptGatewayService],
})
export class GoodsReceiptModule {}
