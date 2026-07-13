import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CacheModule } from 'libs/database/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
