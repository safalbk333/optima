// dto/get-user-roles.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserRolesDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}