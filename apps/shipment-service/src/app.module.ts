import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { PrismaModule } from 'libs/database/prisma.module';
import { GoodsReceivedModule } from './modules/goods-received/goods-received.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
        ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/shipment-service/.env.${process.env.NODE_ENV || 'development'}`,
    }),
    ShipmentModule,
    GoodsReceivedModule,
    InvoiceModule,
    PrismaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}