import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PartialSyncDto {
  @ApiProperty({
    description:
      'The type of data to sync (e.g. "Branch Data", "Employee Data"). Must match a Mapping config type.',
    example: 'Branch Data',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
