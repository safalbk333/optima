import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoiceController } from './invoice.controller';
import { InvoiceGatewayService } from './invoice.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SHIPMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672',
          ],
          queue: process.env.SHIPMENT_QUEUE || 'shipment_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceGatewayService],
})
export class InvoiceModule {}
