import {
  Controller,
  Get,
  Inject,
  UseGuards,
  HttpException,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleGatewayService } from './roles.service';

@ApiTags('Roles')
@Controller('/auth/roles')
export class RolesController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
    private readonly roleService: RoleGatewayService,
  ) { }

  // @ApiOperation({
  //   summary: 'Get All Group Roles',
  //   description: 'Endpoint to retrieve all available group roles.',
  // })
  // @ApiBearerAuth('Auth-Token')
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // @ApiResponse({ status: 200, description: 'Success' })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @ApiResponse({ status: 500, description: 'Internal Server Error' })
  // async getAllRoles() {
  //   return this.client.send('authentication.roles.get-all', {}).pipe(
  //     catchError((error) => {
  //       const status =
  //         typeof error?.status === 'number'
  //           ? error.status
  //           : typeof error?.statusCode === 'number'
  //             ? error.statusCode
  //             : typeof error?.error?.code === 'number'
  //               ? error.error.code
  //               : 500;

  //       throw new HttpException(error, status);
  //     }),
  //   );
  // }

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
  })
  @ApiResponse({
    status: 200,
    description:
      'Role created successfully',
  })
  create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all roles',
  })
  @ApiResponse({
    status: 200,
    description:
      'Role list fetched successfully',
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get role by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Role fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
