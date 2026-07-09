import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { CacheModule } from 'libs/database/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
