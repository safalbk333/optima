import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ActivateDeactivateUserDto {
  @ApiProperty({ example: true, description: 'Set true to activate, false to deactivate' })
  @IsBoolean()
  isActive: boolean;
}
