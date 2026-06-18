import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  userPhone: string;

  @IsUUID()
  fkTenantId: string;

  @IsOptional()
  @IsUUID()
  fkCompanyId?: string;

  @IsUUID()
  fkRoleId: string;
}
