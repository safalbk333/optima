import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'libs/database/prisma.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { CategoryModule } from './modules/category/category.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/master-service/.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PrismaModule,
    CategoryModule,
    ItemModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
