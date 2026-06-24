import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignRoleRequestDto {
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
    example: 'e1abfcd2-1234-5678-90ab-1234567890ab',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'ADMIN',
  })
  @IsString()
  @IsNotEmpty()
  roleName: string;
}