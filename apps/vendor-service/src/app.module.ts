import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VendorModule } from './modules/vendor/vendor.module';
import { PrismaModule } from 'libs/database/prisma.module';

import { ConfigModule } from '@nestjs/config/dist/config.module';

import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [
    // ✅ ENV Configuration
        ConfigModule.forRoot({
          isGlobal: true,
        }),
    VendorModule,
    CategoryModule,
    PrismaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}