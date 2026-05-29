import { IsArray, IsString } from 'class-validator';

export class CreateJobRoleDto {
  @IsString()
  roleName: string;

  @IsArray()
  @IsString({ each: true })
  groups: string[];
}
