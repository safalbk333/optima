import { Injectable } from '@nestjs/common';
import { KeycloakService } from '../../integrations/keycloak/keycloak.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async createPermission(name: string) {
    const token = await this.keycloakService.getToken();

    await this.keycloakService.createRole(
      token,
      `prv_${name}`,
      false,
      `${name} permission`,
    );
  }

  async createPermissionGroup(groupName: string, permissions: string[]) {
    const token = await this.keycloakService.getToken();
    const roleName = `grp_${groupName}`;

    await this.keycloakService.createRole(
      token,
      roleName,
      true,
      `${groupName} group`,
    );

    const permissionRoles = await Promise.all(
      permissions.map((perm) =>
        this.keycloakService.getRole(token, `prv_${perm}`),
      ),
    );

    await this.keycloakService.assignComposites(
      token,
      roleName,
      permissionRoles,
    );
  }
}
