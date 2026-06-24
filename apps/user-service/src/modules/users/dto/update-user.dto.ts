import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'john', required: false })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @ApiProperty({ example: '1234567890', required: false })
  @IsOptional()
  @IsString()
  userPhone?: string;

  @ApiProperty({ example: 'NewPassword@123', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'uuid-company-id', required: false })
  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  fkRoleId?: string;
}
