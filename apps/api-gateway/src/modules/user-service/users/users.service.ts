import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateDeactivateUserDto } from './dto/activate-deactivate-user.dto';
import { USERS_PATTERN } from './users.pattern';

@Injectable()
export class UsersGatewayService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(USERS_PATTERN.FIND_ALL, {}),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(USERS_PATTERN.FIND_ONE, id),
    );
  }

  async create(data: CreateUserDto) {
    return await firstValueFrom(
      this.client.send(USERS_PATTERN.CREATE, data),
    );
  }

  async update(id: string, data: UpdateUserDto) {
    return await firstValueFrom(
      this.client.send(USERS_PATTERN.UPDATE, { id, data }),
    );
  }

  async delete(id: string) {
    return await firstValueFrom(
      this.client.send(USERS_PATTERN.DELETE, id),
    );
  }

  async activateDeactivate(id: string, data: ActivateDeactivateUserDto) {
    return await firstValueFrom(
      this.client.send(USERS_PATTERN.ACTIVATE_DEACTIVATE, { id, data }),
    );
  }
}
