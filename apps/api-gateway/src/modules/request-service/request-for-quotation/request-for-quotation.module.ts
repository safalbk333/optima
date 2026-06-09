import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RequestForQuotationController } from './request-for-quotation.controller';
import { RequestForQuotationGatewayService } from './request-for-quotation.service';

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
  controllers: [RequestForQuotationController],
  providers: [RequestForQuotationGatewayService],
  exports: [RequestForQuotationGatewayService],
})
export class RequestForQuotationModule {}
