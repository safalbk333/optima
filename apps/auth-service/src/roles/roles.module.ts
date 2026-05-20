import { Module } from '@nestjs/common';
import { GroupRolesController } from './roles.controller';
import { GroupRolesService } from './roles.service';

@Module({
  controllers: [GroupRolesController],
  providers: [GroupRolesService],
})
export class RolesModule {}
