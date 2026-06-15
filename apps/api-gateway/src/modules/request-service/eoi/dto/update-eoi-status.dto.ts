import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EoiStatus } from '../enum/eoi-status.enum';

export class UpdateEoiStatusDto {
  @ApiProperty({
    description: 'EOI status',
    enum: EoiStatus,
    example: EoiStatus.SENT,
  })
  @IsEnum(EoiStatus)
  status: EoiStatus;

  @ApiPropertyOptional({
    description: 'Notes associated with status update',
    example: 'Sent to vendor on 2026-05-26',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
