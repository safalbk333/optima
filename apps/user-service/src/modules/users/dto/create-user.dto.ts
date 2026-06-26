import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  userEmail: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'FK to tbl_user_role', example: 'uuid-role-id' })
  @IsUUID()
  fkRoleId: string;

  @ApiPropertyOptional({ description: 'FK to tbl_company' })
  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @ApiPropertyOptional({ description: 'Keycloak schema-id attribute' })
  @IsOptional()
  @IsString()
  schemaId?: string;
}