import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({
    example: 'http://localhost:5173',
    description: 'Request origin',
  })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    example: 'auth-client',
    description: 'Client identifier',
  })
  @IsString()
  @IsNotEmpty()
  client: string;

  @ApiProperty({
    example: 'f3c2c8d8-1234-5678-90ab-cdef12345678',
    description: 'Keycloak User ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Realm role name',
  })
  @IsString()
  @IsNotEmpty()
  roleName: string;
}