import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMilestonePriceDto {
  @ApiProperty({
    description: 'Name of the milestone',
    example: 'Phase 1 - Design',
  })
  @IsString()
  @IsNotEmpty()
  milestone_name: string;

  @ApiProperty({
    description: 'Execution order of the milestone',
    example: 1,
  })
  @IsInt()
  @Min(1)
  milestone_order: number;

  @ApiProperty({
    description: 'Unit price for the milestone',
    example: 5000,
  })
  @IsNumber()
  @Min(0)
  unit_price: number;
}