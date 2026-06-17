import {
  Controller,
  Get,
  Inject,
  UseGuards,
  HttpException,
  Post,
  Body,
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

@ApiTags('Permissions')
@Controller('/auth/permissions')
export class PermissionsController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) { }

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
    return this.client.send('authentication.permissions.get-all', {}).pipe(
      catchError((error) => {
        const status =
          typeof error?.status === 'number'
            ? error.status
            : typeof error?.statusCode === 'number'
              ? error.statusCode
              : typeof error?.error?.code === 'number'
                ? error.error.code
                : 500;

        throw new HttpException(error, status);
      }),
    );
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
      origin:'http://localhost:5173',
      client:'auth-client'
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
  async createPermission(@Body() permission: CreatePermissionDto,) {
    return this.client
      .send('authentication.permissions.create', permission)
      .pipe(
        catchError((error) => {
          const status =
            typeof error?.status === 'number'
              ? error.status
              : typeof error?.statusCode === 'number'
                ? error.statusCode
                : typeof error?.error?.code === 'number'
                  ? error.error.code
                  : 500;

          throw new HttpException(error, status);
        }),
      );
  }
}
