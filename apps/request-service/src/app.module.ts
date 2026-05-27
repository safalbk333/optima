import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'libs/database/prisma.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { PurchaseRequestModule } from './modules/purchase-request/purchase-request.module';
import { EoiModule } from './modules/eoi/eoi.module';
import { RequestForQuotationModule } from './modules/request-for-quotation/request-for-quotation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/request-service/.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PrismaModule,
    PurchaseRequestModule,
    EoiModule,
    RequestForQuotationModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
