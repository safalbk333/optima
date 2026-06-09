import {
  Controller,
  Get,
  Inject,
  Request,
  UseGuards,
  HttpException,
  Query,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { catchError } from 'rxjs';
import {
  AuthDto,
  RefreshTokenDto,
  ChangePasswordDto,
  ClientTokenDto,
  GetClientAttributesDto,
  UpdateClientAttributesDto,
} from './dto/auth.dto';

@ApiTags('AUTH Keycloak')
@Controller('auth')
export class KeycloakController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  // @ApiExcludeEndpoint()
  @ApiOperation({
    summary: 'User Authentication',
    description:
      'Endpoint for user authentication using issuer, code, and client ID.',
  })
  @Get()
  @ApiQuery({
    name: 'redirectUrl',
    required: true,
    description: 'The full redirect URL (e.g., loader page)',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async auth(@Request() req) {
    const payload: AuthDto = {
      ...req.query,
      origin: req.headers['origin'],
      client: req.headers['client'],
    };
    return this.client.send('authentication.keycloak.auth', payload).pipe(
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
    summary: 'User Change Password',
    description: 'Endpoint for user password change.',
  })
  @ApiBearerAuth('Auth-Token')
  @ApiHeader({
    name: 'client',
    required: false,
    description: 'The client ID (e.g., client, travelapp)',
  })
  @ApiHeader({
    name: 'origin',
    required: false,
    description: 'The origin of the request',
  })
  @ApiQuery({
    name: 'redirectUri',
    required: true,
    description: 'The full redirect URI (e.g., login page after update)',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/change-password')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async changePassword(@Request() req, @Query() query) {
    const payload: ChangePasswordDto = {
      client: req.headers['client'],
      origin: req.headers['origin'],
      redirectUri: query.redirectUri,
    };
    return this.client
      .send('authentication.keycloak.change-password', payload)
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

  @ApiOperation({
    summary: 'User Signout',
    description: 'Endpoint for user signout using refresh token and client ID.',
  })
  @ApiBearerAuth('Auth-Token')
  @ApiHeader({
    name: 'refreshtoken',
    required: true,
    description: 'The refresh token used to sign out the user',
  })
  @ApiHeader({
    name: 'client',
    required: false,
    description: 'The client ID (e.g., client, travelapp)',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/signout')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async signOut(@Request() req) {
    const payload: RefreshTokenDto = {
      refreshToken: req.headers['refreshtoken'],
      client: req.headers['client'],
    };
    return this.client.send('authentication.keycloak.signout', payload).pipe(
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
    summary: 'Refresh User Access Token',
    description:
      'Endpoint for refreshing access token using refresh token and client ID.',
  })
  @ApiBearerAuth('Auth-Token')
  @ApiHeader({
    name: 'refreshtoken',
    required: true,
    description: 'The refresh token used to obtain new access token',
  })
  @ApiHeader({
    name: 'client',
    required: false,
    description: 'The client ID (e.g., client, travelapp)',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/refresh-token')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async refreshToken(@Request() req) {
    const payload: RefreshTokenDto = {
      refreshToken: req.headers['refreshtoken'],
      client: req.headers['client'],
    };
    return this.client
      .send('authentication.keycloak.refresh-token', payload)
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

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate Client Token',
    description:
      'Endpoint to generate access token for a client using client credentials.',
  })
  @ApiBody({
    description: 'Client credentials',
    type: ClientTokenDto,
  })
  @Post('/client-token')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getClientToken(
    @Body() body: { clientId: string; clientSecret: string },
  ) {
    return this.client.send('authentication.keycloak.client-token', body).pipe(
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
    summary: 'Get Client Attributes',
    description: 'Endpoint to retrieve attributes of a Keycloak client.',
  })
  @ApiBearerAuth('Auth-Token')
  @ApiQuery({
    name: 'clientId',
    required: true,
    description: 'The client ID (e.g., client, travelapp)',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/client-attributes')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getClientAttributes(@Query() query: GetClientAttributesDto) {
    const payload: GetClientAttributesDto = query;
    return this.client
      .send('authentication.keycloak.client.attributes.get', payload)
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

  @ApiOperation({
    summary: 'Update Client Attributes',
    description: 'Endpoint to update attributes of a Keycloak client.',
  })
  @ApiBearerAuth('Auth-Token')
  @ApiBody({
    description: 'Client attributes to update',
    type: UpdateClientAttributesDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post('/client-attributes')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateClientAttributes(@Body() body: UpdateClientAttributesDto) {
    const payload: UpdateClientAttributesDto = body;
    return this.client
      .send('authentication.keycloak.client.attributes.update', payload)
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
