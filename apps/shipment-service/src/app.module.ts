import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { PrismaModule } from 'libs/database/prisma.module';
import { GoodsReceivedModule } from './modules/goods-received/goods-received.module';

@Module({
  imports: [
    ShipmentModule,
    GoodsReceivedModule,
    PrismaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}