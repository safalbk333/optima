import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEoiDto {
  @IsOptional()
  @IsString()
  chr_eoi_title?: string;

  @IsOptional()
  @IsString()
  txt_notes?: string;

  @IsOptional()
  @IsDateString()
  dt_submission_deadline?: string;
}