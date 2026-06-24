import { Injectable } from '@nestjs/common';
import { KeycloakService } from '../../integrations/keycloak/keycloak.service';

@Injectable()
export class RolesService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async addPermissions(roleName: string, permissions: { id: string; name: string }[]) {
    const token = await this.keycloakService.getToken();
    await this.keycloakService.assignComposites(token, roleName, permissions);
  }

  async createJobRole(roleName: string, groups: string[]) {
    const token = await this.keycloakService.getToken();
    const fullRoleName = `job_${roleName}`;

    await this.keycloakService.createRole(
      token,
      fullRoleName,
      true,
      `${roleName} job role`,
    );

    const groupRoles = await Promise.all(
      groups.map((group) =>
        this.keycloakService.getRole(token, `grp_${group}`),
      ),
    );

    await this.keycloakService.assignComposites(token, fullRoleName, groupRoles);
  }
}
