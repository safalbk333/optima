import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEoiDto {
  @IsString()
  chr_eoi_title: string;

  @IsUUID()
  fk_chr_request_id: string;

  @IsUUID()
  fk_chr_vendor_id: string;

  @IsOptional()
  @IsString()
  txt_notes?: string;

  @IsDateString()
  dt_submission_deadline: string;
}