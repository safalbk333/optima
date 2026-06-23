import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  userEmail: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsString()
  userPhone: string;

  @ApiPropertyOptional({ description: 'Company ID the user belongs to' })
  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @ApiProperty({ description: 'Role ID the user belongs to' })
  @IsUUID()
  fkRoleId: string;
}
