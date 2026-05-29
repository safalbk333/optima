import { IsArray, IsString } from 'class-validator';

export class CreatePermissionGroupDto {
  @IsString()
  groupName: string;

  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
