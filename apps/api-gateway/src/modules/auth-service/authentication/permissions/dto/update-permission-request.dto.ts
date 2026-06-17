import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentPermissionName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  permissionName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}