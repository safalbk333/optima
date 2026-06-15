import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEoiDto {
  @IsOptional()
  @IsString()
  eoi_title?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  submission_deadline?: string;
}