import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VendorModule } from './modules/vendor/vendor.module';
import { PrismaModule } from 'libs/database/prisma.module';


@Module({
  imports: [
    VendorModule,
    PrismaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}