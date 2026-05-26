import { Module } from '@nestjs/common';
import { EoiController } from './eoi.controller';
import { EoiService } from './eoi.service';

@Module({
  controllers: [EoiController],
  providers: [EoiService],
  exports: [EoiService],
})
export class EoiModule {}
