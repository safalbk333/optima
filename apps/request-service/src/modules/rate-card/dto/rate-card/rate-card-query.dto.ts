import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { RateCardStatus } from '../../enums/rate-card-status.enum';

export class RateCardQueryDto {
  @ApiPropertyOptional({ enum: RateCardStatus })
  @IsOptional()
  @IsEnum(RateCardStatus)
  status?: RateCardStatus;

  @ApiPropertyOptional({ description: 'Filter by vendor ID' })
  @IsOptional()
  @IsUUID()
  fk_vendor_id?: string;

  @ApiPropertyOptional({ description: 'Search by rate card code or name' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}