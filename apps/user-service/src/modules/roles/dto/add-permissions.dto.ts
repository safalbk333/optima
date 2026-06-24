import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RoleRefDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class AddPermissionsDto {
  @IsString()
  roleName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleRefDto)
  permissions: RoleRefDto[];
}
