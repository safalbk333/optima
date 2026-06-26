import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { url } from 'inspector';

@Injectable()
export class KeycloakService {
  private readonly baseUrl = process.env.KEYCLOAK_URL;
  private readonly realm = process.env.KEYCLOAK_REALM || 'optima-realm';
  private readonly clientId = process.env.KEYCLOAK_CLIENT_ID;
  private readonly clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

  private handleAxiosError(operation: string, error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;

      console.error(`${operation} failed`, {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });

      throw new BadRequestException({
        message: `${operation} failed`,
        status: axiosError.response?.status,
        error: axiosError.response?.data,
      });
    }

    throw new InternalServerErrorException(
      `${operation} failed due to an unexpected error`,
    );
  }
  async getToken(): Promise<string> {
    try {
      const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;

      const { data } = await axios.post(
        url,
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
    } catch (error) {
      this.handleAxiosError('getToken', error);
    }
  }
  async createUser(token: string, payload: any): Promise<string> {
    try {
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
    } catch (error) {
      this.handleAxiosError('createUser', error);
    }
  }
  async updateUser(token: string, userId: string, payload: any): Promise<void> {
    try {
      await axios.put(
        `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      this.handleAxiosError('updateUser', error);
    }
  }

  async createRole(
    token: string,
    name: string,
    composite = false,
    description?: string,
  ): Promise<void> {
    try {
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
    } catch (error) {
      this.handleAxiosError('createRole', error);
    }
  }
  async getRole(token: string, roleName: string) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}/admin/realms/${this.realm}/roles/${encodeURIComponent(roleName)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      this.handleAxiosError('getRole', error);
    }
  }

  async assignRealmRoles(
    token: string,
    userId: string,
    roles: any[],
  ): Promise<void> {
    try {
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
    } catch (error) {
      this.handleAxiosError('assignRealmRoles', error);
    }
  }

  async assignComposites(
    token: string,
    parentRole: string,
    childRoles: any[],
  ): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/admin/realms/${this.realm}/roles/${encodeURIComponent(parentRole)}/composites`,
        childRoles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      this.handleAxiosError('assignComposites', error);
    }
  }

  async disableUser(token: string, userId: string): Promise<void> {
    try {
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
    } catch (error) {
      this.handleAxiosError('disableUser', error);
    }
  }

  async deleteUser(token: string, userId: string): Promise<void> {
    try {
      await axios.delete(
        `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      this.handleAxiosError('deleteUser', error);
    }
  }
}
