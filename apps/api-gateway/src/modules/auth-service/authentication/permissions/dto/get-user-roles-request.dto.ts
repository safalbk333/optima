// get-user-roles-request.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserRolesRequestDto {
  @ApiProperty({
    example: 'e1abfcd2-1234-5678-90ab-1234567890ab',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}