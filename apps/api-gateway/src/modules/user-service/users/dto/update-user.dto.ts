import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Full name of the user' })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({ description: 'Email address of the user' })
  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @ApiPropertyOptional({ description: 'Phone number of the user' })
  @IsOptional()
  @IsString()
  userPhone?: string;

  @ApiPropertyOptional({ description: 'Tenant ID the user belongs to' })
  @IsOptional()
  @IsUUID()
  fkTenantId?: string;

  @ApiPropertyOptional({ description: 'Company ID the user belongs to' })
  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @ApiPropertyOptional({ description: 'Whether the user is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
