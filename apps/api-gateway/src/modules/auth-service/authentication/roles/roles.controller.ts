import {
  Controller,
  Get,
  Inject,
  UseGuards,
  HttpException,
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

@ApiTags('Group Roles')
@Controller('/auth/group-roles')
export class GroupRolesController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @ApiOperation({
    summary: 'Get All Group Roles',
    description: 'Endpoint to retrieve all available group roles.',
  })
  @ApiBearerAuth('Auth-Token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllRoles() {
    return this.client.send('authentication.roles.get-all', {}).pipe(
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
