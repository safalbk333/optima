import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ContractModule } from './modules/contract/contract.module';

import { PrismaModule } from 'libs/database/prisma.module';

@Module({
  imports: [
    ContractModule,
    PrismaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
