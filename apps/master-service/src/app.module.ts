import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'libs/database/prisma.module';
import { CacheModule } from 'libs/database/cache.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { CategoryModule } from './modules/category/category.module';
import { ItemModule } from './modules/item/item.module';
import { DepartmentModule } from './modules/department/department.module';
import { TemplateModule } from './modules/template/template.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { CountryModule } from './modules/country/country.module';
import { CityModule } from './modules/city/city.module';
import { CompanyModule } from './modules/company/company.module';
import { BudgetModule } from './modules/budget/budget.module';
import { StateModule } from './modules/state/state.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/master-service/.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PrismaModule,
   // CacheModule,
    CategoryModule,
    ItemModule,
    DepartmentModule,
    TemplateModule,
    CurrencyModule,
    CountryModule,
    CityModule,
    CompanyModule,
    BudgetModule,
    StateModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
