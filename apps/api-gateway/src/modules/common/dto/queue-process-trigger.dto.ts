import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum ProcessMode {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

export enum Source {
  EMPLOYEE = 'EMPLOYEE',
  GENERAL = 'GENERAL',
  BRANCH = 'BRANCH',
  RESIGNED_EMPLOYEE = 'RESIGNED_EMPLOYEE',
}

export class TriggerSyncDto {
  @ApiProperty({
    enum: ProcessMode,
    default: ProcessMode.MANUAL,
    description: 'The mode of the sync operation',
  })
  @IsEnum(ProcessMode)
  @IsOptional()
  mode: ProcessMode = ProcessMode.MANUAL;
}
