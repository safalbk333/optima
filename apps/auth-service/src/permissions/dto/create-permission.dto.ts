
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

export class CreatePermissionDto {
  @IsString()
  permissionName: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedOrigin()
  origin: string;
}
