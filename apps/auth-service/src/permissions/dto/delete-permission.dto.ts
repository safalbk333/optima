import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import {
  IsAllowedClient,
  IsAllowedOrigin,
} from './create-permission.dto';

export class DeletePermissionDto {
  @IsString()
  @IsNotEmpty()
  permissionName: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedClient()
  client: string;

  @IsString()
  @IsNotEmpty()
  @IsAllowedOrigin()
  origin: string;
}