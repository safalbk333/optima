import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  filterKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  filterValue?: string;
}
