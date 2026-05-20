import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { KeycloakController } from './keycloak/keycloak.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { KeycloakService } from './keycloak/keycloak.service';
import { PermissionsService } from './permissions/permissions.service';

@Module({
  imports: [ // ✅ ENV Configuration
    ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `apps/auth-service/.env.${process.env.NODE_ENV || 'development'}`,
}),
  KeycloakModule,
    PermissionsModule,
    RolesModule,
],
  controllers: [AuthServiceController,KeycloakController,PermissionsController],
  providers: [AuthServiceService,KeycloakService,PermissionsService],
})
export class AuthServiceModule {}
