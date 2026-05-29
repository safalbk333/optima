import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma-service';
import { KeycloakService } from '../../integrations/keycloak/keycloak.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly keycloakService: KeycloakService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { optimaId: dto.optimaId }],
      },
    });

    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const token = await this.keycloakService.getToken();

    const keycloakUserId = await this.keycloakService.createUser(token, {
      username: dto.optimaId,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      enabled: true,
      attributes: {
        optimaId: [dto.optimaId],
      },
    });

    const roles = await Promise.all(
      dto.roles.map((role) => this.keycloakService.getRole(token, role)),
    );

    await this.keycloakService.assignRealmRoles(token, keycloakUserId, roles);

    return this.prisma.user.create({
      data: {
        keycloakUserId,
        optimaId: dto.optimaId,
        email: dto.email,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        source: 'MANUAL',
      },
    });
  }

  async disableUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = await this.keycloakService.getToken();

    await this.keycloakService.disableUser(token, user.keycloakUserId);

    return this.prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
