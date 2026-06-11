import {
  IsString,
  IsNotEmpty,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'isAllowedOrigin', async: false })
export class IsAllowedOriginConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);
    if (!allowedOrigins.length) {
      throw new Error('ALLOWED_ORIGINS environment variable is not set');
    }
    return typeof value === 'string' && allowedOrigins.includes(value);
  }

  defaultMessage() {
    return 'Origin must be one of the allowed values defined in ALLOWED_ORIGINS environment variable';
  }
}

export function IsAllowedOrigin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAllowedOrigin',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAllowedOriginConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isAllowedClient', async: false })
export class IsAllowedClientConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const allowedClients = (process.env.ALLOWED_CLIENTS || '')
      .split(',')
      .map((client) => client.trim())
      .filter(Boolean);
    if (!allowedClients.length) {
      throw new Error('ALLOWED_CLIENTS environment variable is not set');
    }
    return typeof value === 'string' && allowedClients.includes(value);
  }

  defaultMessage() {
    return 'Client must be one of the allowed values defined in ALLOWED_CLIENTS environment variable';
  }
}

export function IsAllowedClient(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAllowedClient',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAllowedClientConstraint,
    });
  };
}

export function IsValidState(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidState',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const expectedState = process.env.STATE;
          return typeof value === 'string' && value === expectedState;
        },
        defaultMessage() {
          return 'Invalid state parameter';
        },
      },
    });
  };
}

@ValidatorConstraint({ name: 'isMatchingOrigin', async: false })
export class MatchesOriginConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const relatedValue = (args.object as any).origin;
    return typeof value === 'string' && value.startsWith(relatedValue);
  }

  defaultMessage() {
    return 'Redirect must start with the provided origin';
  }
}

export function IsMatchingOrigin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMatchingOrigin',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: MatchesOriginConstraint,
    });
  };
}

export class AuthDto {
  @ApiProperty({
    description: 'The issuer URL of the Keycloak server',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  iss: string;

  @ApiProperty({
    description: 'The authorization code received from Keycloak',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description:
      'The state parameter to prevent CSRF attacks, must match the expected value',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsValidState()
  state: string;

  @ApiProperty({
    description: 'The origin of the request',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsAllowedOrigin()
  origin: string;

  @ApiProperty({
    description: 'The client ID (e.g., client, travelapp)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;

  @ApiProperty({
    description:
      'The full redirect URL (must start with origin, e.g., for loader page)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsMatchingOrigin()
  redirectUrl: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token used to obtain a new access token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({
    description: 'The client ID (e.g., client, travelapp)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The client ID (e.g., client, travelapp)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;

  @ApiProperty({
    description: 'The origin of the request',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsAllowedOrigin()
  origin: string;

  @ApiProperty({
    description:
      'The full redirect URI (must start with origin, e.g., for login page after update)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsMatchingOrigin()
  redirectUri: string;
}

export class ClientTokenDto {
  @ApiProperty({
    description: 'The client ID',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'The client secret',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clientSecret: string;
}

export class GetClientAttributesDto {
  @ApiProperty({
    description: 'The client ID (e.g., client, travelapp)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

export class UpdateClientAttributesDto {
  @ApiProperty({
    description: 'The client ID (e.g., client, travelapp)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'The attributes object to update',
    required: true,
    type: 'object',
    example: {
      app_name: 'AURA- Autonomous Unified Resouce Assistant',
      title_text: 'AURA Login',
      logo_url: '/resources/payroll-theme/login/resources/img/logo.svg',
      favicon_url: '/resources/payroll-theme/login/resources/img/favicon.ico',
    },
  })
  @IsObject()
  attributes: Record<string, string>;
}
