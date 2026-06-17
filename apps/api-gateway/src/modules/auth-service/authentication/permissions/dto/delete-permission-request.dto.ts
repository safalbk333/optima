import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePermissionRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  permissionName: string;
}