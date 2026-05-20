import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KeycloakService } from './keycloak.service';
import {
  AuthDto,
  RefreshTokenDto,
  ChangePasswordDto,
  ClientTokenDto,
  GetClientAttributesDto,
  UpdateClientAttributesDto,
} from './dto/auth.dto';

@Controller('auth')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @MessagePattern('authentication.keycloak.auth')
  async auth(@Payload() payload: AuthDto) {
    return await this.keycloakService.auth(payload);
  }

  @MessagePattern('authentication.keycloak.change-password')
  async changePassword(@Payload() payload: ChangePasswordDto) {
    return await this.keycloakService.changePassword(payload);
  }

  @MessagePattern('authentication.keycloak.signout')
  async signOut(@Payload() payload: RefreshTokenDto) {
    return await this.keycloakService.signOut(payload);
  }

  @MessagePattern('authentication.keycloak.refresh-token')
  async refreshToken(@Payload() payload: RefreshTokenDto) {
    return await this.keycloakService.refreshAccessToken(payload);
  }

  @MessagePattern('authentication.keycloak.client-token')
  async getClientToken(@Payload() payload: ClientTokenDto) {
    return await this.keycloakService.getClientToken(payload);
  }

  @MessagePattern('authentication.keycloak.client.attributes.get')
  async getClientAttributes(@Payload() payload: GetClientAttributesDto) {
    return await this.keycloakService.getClientAttributes(payload);
  }

  @MessagePattern('authentication.keycloak.client.attributes.update')
  async updateClientAttributes(@Payload() payload: UpdateClientAttributesDto) {
    return await this.keycloakService.updateClientAttributes(payload);
  }
}
