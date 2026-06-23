import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john' })
  @IsString()
  userName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  userEmail: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  userPhone: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'uuid-company-id', required: false })
  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @IsUUID()
  fkRoleId: string;
  
  @ApiProperty({ example: 'schema-123', required: false })
  @IsOptional()
  @IsString()
  schemaId?: string;
}
