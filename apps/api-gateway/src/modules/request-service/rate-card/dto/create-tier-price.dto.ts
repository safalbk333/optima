import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTierPriceDto {
  @ApiProperty({ example: 1, description: 'Minimum quantity for this tier (inclusive)' })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  min_qty: number;

  @ApiProperty({ example: 100, description: 'Maximum quantity for this tier (inclusive)' })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  max_qty: number;

  @ApiProperty({ example: 100.0, description: 'Unit price applicable for this tier range' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  unit_price: number;
}
