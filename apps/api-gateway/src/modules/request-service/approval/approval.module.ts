import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApprovalLevelController } from './approval.controller';
import { ApprovalLevelGatewayService } from './approval.service';

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
  controllers: [ApprovalLevelController],
  providers: [ApprovalLevelGatewayService],
  exports: [ApprovalLevelGatewayService],
})
export class ApprovalLevelModule { }
