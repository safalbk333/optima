import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CacheModule } from 'libs/database/cache.module';

@Module({
  //imports: [CacheModule],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
