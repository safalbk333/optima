import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './modules/vendor/vendor.module';
import { PrismaModule } from 'libs/database/prisma.module';
import { QuotationModule } from './modules/quotation/quotation.module';

import { ConfigModule } from '@nestjs/config/dist/config.module';


@Module({
  imports: [
    ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `apps/vendor-service/.env.${process.env.NODE_ENV || 'development'}`,
}),
    VendorModule,
    PrismaModule,
    QuotationModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}