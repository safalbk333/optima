import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username (used as Keycloak username)', example: 'john.doe' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  @IsEmail()
  userEmail: string;

  @ApiProperty({ description: 'Password for Keycloak account', example: 'Password@123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Phone number of the user', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @ApiProperty({ description: 'Role ID the user belongs to', example: 'uuid-role-id' })
  @IsUUID()
  fkRoleId: string;

  @ApiPropertyOptional({ description: 'Company ID the user belongs to' })
  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @ApiPropertyOptional({ description: 'Keycloak schema-id attribute' })
  @IsOptional()
  @IsString()
  schemaId?: string;
}