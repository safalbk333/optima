import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

export class CreateMilestonePriceDto {
  @ApiProperty({ example: 'Foundation', description: 'Milestone name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  milestone_name: string;

  @ApiProperty({ example: 1, description: 'Sequence order of this milestone' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  milestone_order: number;

  @ApiProperty({ example: 100.0, description: 'Unit price for this milestone' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  unit_price: number;
}