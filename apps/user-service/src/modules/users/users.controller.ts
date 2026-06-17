import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('users.findOne')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('users.create')
  create(@Payload() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @MessagePattern('users.update')
  update(@Payload() payload: { id: string; data: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.data);
  }

  @MessagePattern('users.delete')
  delete(@Payload() id: string) {
    return this.usersService.delete(id);
  }
}
