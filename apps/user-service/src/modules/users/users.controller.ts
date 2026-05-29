import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'users.create' })
  createUser(@Payload() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @MessagePattern({ cmd: 'users.disable' })
  disableUser(@Payload() data: { id: string }) {
    return this.usersService.disableUser(data.id);
  }
}
