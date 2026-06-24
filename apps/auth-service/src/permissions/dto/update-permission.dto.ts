import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import {
  IsAllowedClient,
  IsAllowedOrigin,
} from './create-permission.dto';

export class UpdatePermissionDto {
  @IsString()
  @IsNotEmpty()
  currentPermissionName: string;

  @IsString()
  @IsNotEmpty()
  permissionName: string;

  @IsString()
  @IsNotEmpty()
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