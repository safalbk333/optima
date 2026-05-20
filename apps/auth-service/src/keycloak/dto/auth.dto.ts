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
  @IsString()
  @IsNotEmpty()
  iss: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @IsValidState()
  state: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedOrigin()
  origin: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;

  @IsString()
  @IsNotEmpty()
  @IsMatchingOrigin()
  redirectUrl: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedOrigin()
  origin: string;

  @IsString()
  @IsNotEmpty()
  @IsMatchingOrigin()
  redirectUri: string;
}

export class ClientTokenDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  clientSecret: string;
}

export class GetClientAttributesDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

export class UpdateClientAttributesDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsObject()
  attributes: Record<string, string>;
}
