import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { KeycloakModule } from '../../integrations/keycloak/keycloak.module';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [KeycloakModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, Reflector],
  exports: [PermissionsService],
})
export class PermissionsModule {}
