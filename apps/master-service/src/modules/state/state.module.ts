import { Module } from '@nestjs/common';
import { CacheModule } from 'libs/database/cache.module';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  //imports: [CacheModule],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
