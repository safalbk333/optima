import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  private readonly baseUrl = process.env.KEYCLOAK_URL;
  private readonly realm = process.env.KEYCLOAK_REALM;
  private readonly clientId = process.env.KEYCLOAK_CLIENT_ID;
  private readonly clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

  async getToken(): Promise<string> {
    const { data } = await axios.post(
      `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data.access_token;
  }

  async createUser(token: string, payload: any): Promise<string> {
    const { headers } = await axios.post(
      `${this.baseUrl}/admin/realms/${this.realm}/users`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const userId = headers.location?.split('/').pop();

    if (!userId) {
      throw new BadRequestException('Failed to create user');
    }

    return userId;
  }

  async createRole(
    token: string,
    name: string,
    composite = false,
    description?: string,
  ) {
    await axios.post(
      `${this.baseUrl}/admin/realms/${this.realm}/roles`,
      {
        name,
        composite,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async getRole(token: string, roleName: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/admin/realms/${this.realm}/roles/${encodeURIComponent(
        roleName,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }

  async assignRealmRoles(token: string, userId: string, roles: any[]) {
    await axios.post(
      `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}/role-mappings/realm`,
      roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async assignComposites(token: string, parentRole: string, childRoles: any[]) {
    await axios.post(
      `${this.baseUrl}/admin/realms/${this.realm}/roles/${encodeURIComponent(
        parentRole,
      )}/composites`,
      childRoles,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async disableUser(token: string, userId: string) {
    await axios.put(
      `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`,
      {
        enabled: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
