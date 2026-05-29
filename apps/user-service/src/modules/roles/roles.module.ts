import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { KeycloakModule } from '../../integrations/keycloak/keycloak.module';

@Module({
  imports: [KeycloakModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
