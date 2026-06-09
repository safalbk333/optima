import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuotationController } from './quotation.controller';
import { QuotationGatewayService } from './quotation.service';

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
  controllers: [QuotationController],
  providers: [QuotationGatewayService],
  exports: [QuotationGatewayService],
})
export class QuotationModule {}
