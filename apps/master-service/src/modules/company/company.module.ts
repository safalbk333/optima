import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CacheModule } from 'libs/database/cache.module';

@Module({
  // imports: [CacheModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
