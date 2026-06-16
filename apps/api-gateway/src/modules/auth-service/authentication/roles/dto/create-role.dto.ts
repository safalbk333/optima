import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
  })
  @IsString()
  role_name: string;

  @ApiProperty({
    description: 'Role code',
  })
  @IsString()
  role_code: string;

  @ApiProperty({
    description: 'Role code',
  })
  @IsString()
  description: string;
}