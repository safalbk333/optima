import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
