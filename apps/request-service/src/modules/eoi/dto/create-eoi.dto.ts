import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEoiDto {
  @IsString()
  eoi_title: string;

  @IsUUID()
  fk_request_id: string;

  @IsUUID()
  fk_vendor_id: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsDateString()
  submission_deadline: string;
}