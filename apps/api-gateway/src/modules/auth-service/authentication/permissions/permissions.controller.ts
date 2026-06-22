import {
  Controller,
  Get,
  Inject,
  UseGuards,
  HttpException,
  Post,
  Body,
  Put,
  Delete,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission-request.dto';
import { DeletePermissionRequestDto } from './dto/delete-permission-request.dto';
import { AssignRoleRequestDto } from './dto/assign-role-request.dto';
import { GetUserRolesRequestDto } from './dto/get-user-roles-request.dto';

@ApiTags('Permissions')
@ApiBearerAuth('Auth-Token')
@Controller('/auth/permissions')
export class PermissionsController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  private extractHeaders(req: any): { origin: string; client: string } {
    const origin = req.headers.origin;
    const client = req.headers.client;

    if (!origin) {
      throw new BadRequestException('Missing required header: origin');
    }
    if (!client) {
      throw new BadRequestException('Missing required header: client');
    }

    return { origin, client };
  }

  private handleError(error: any):never {
    const status =
      typeof error?.status === 'number'
        ? error.status
        : typeof error?.statusCode === 'number'
          ? error.statusCode
          : typeof error?.error?.code === 'number'
            ? error.error.code
            : 500;

    throw new HttpException(error, status);
  }

  @ApiOperation({
    summary: 'Get All Permissions',
    description: 'Endpoint to retrieve all available permissions.',
  })
  @ApiBearerAuth('Auth-Token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllPermissions() {
    return this.client
      .send('authentication.permissions.get-all', {})
      .pipe(catchError((error) => this.handleError(error)));
  }

  @ApiOperation({
    summary: 'Create Permission',
    description: 'Create a new permission (Keycloak realm role).',
  })
  @ApiBody({
    description: 'Create Permission Payload',
    schema: {
      example: {
        name: 'company-admin',
        description: 'Company Administrator',
        origin: 'http://localhost:5173',
        client: 'auth-client',
      },
    },
  })
  @ApiBearerAuth('Auth-Token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Permission created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createPermission(@Body() permission: CreatePermissionDto) {
    return this.client
      .send('authentication.permissions.create', permission)
      .pipe(catchError((error) => this.handleError(error)));
  }

  @Put()
  @ApiOperation({
    summary: 'Update Permission',
    description: 'Update an existing Keycloak realm role.',
  })
  @ApiBearerAuth('Auth-Token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Permission updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({ type: UpdatePermissionRequestDto })
  async updatePermission(@Req() req, @Body() body: UpdatePermissionRequestDto) {
    const { origin, client } = this.extractHeaders(req);

    return this.client
      .send('authentication.permissions.update', { ...body, origin, client })
      .pipe(catchError((error) => this.handleError(error)));
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete Permission',
    description: 'Delete an existing Keycloak realm role.',
  })
  @ApiBearerAuth('Auth-Token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: DeletePermissionRequestDto })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async deletePermission(@Req() req, @Body() body: DeletePermissionRequestDto) {
    const { origin, client } = this.extractHeaders(req);

    return this.client
      .send('authentication.permissions.delete', { ...body, origin, client })
      .pipe(catchError((error) => this.handleError(error)));
  }

  @Post('/assign-role')
  @ApiOperation({
    summary: 'Assign Role To User',
    description: 'Assign a Keycloak realm role to a user',
  })
  // @ApiBearerAuth('Auth-Token')
  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: AssignRoleRequestDto })
  @ApiResponse({ status: 200, description: 'Role assigned successfully' })
  async assignRole(@Req() req, @Body() body: AssignRoleRequestDto) {
    const { origin, client } = this.extractHeaders(req);

    return this.client
      .send('authentication.permissions.assign-role', { ...body, origin, client })
      .pipe(catchError((error) => this.handleError(error)));
  }

  @Post('/remove-role')
  @ApiOperation({
    summary: 'Remove Role From User',
    description: 'Remove a Keycloak realm role from a user',
  })
  @ApiBearerAuth('Auth-Token')
  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: AssignRoleRequestDto })
  @ApiResponse({ status: 200, description: 'Role removed successfully' })
  async removeRole(@Req() req, @Body() body: AssignRoleRequestDto) {
    const { origin, client } = this.extractHeaders(req);

    return this.client
      .send('authentication.permissions.remove-role', { ...body, origin, client })
      .pipe(catchError((error) => this.handleError(error)));
  }

  @Post('/user-roles')
  @ApiOperation({
    summary: 'Get User Roles',
    description: 'Retrieve all realm roles assigned to a user',
  })
  @ApiBearerAuth('Auth-Token')
  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: GetUserRolesRequestDto })
  @ApiResponse({ status: 200, description: 'User roles retrieved successfully' })
  async getUserRoles(@Req() req, @Body() body: GetUserRolesRequestDto) {
    const { origin, client } = this.extractHeaders(req);

    return this.client
      .send('authentication.permissions.user-roles', { ...body, origin, client })
      .pipe(catchError((error) => this.handleError(error)));
  }
}