import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EoiStatus } from '../enum/eoi-status.enum';

export class UpdateEoiStatusDto {
  @IsEnum(EoiStatus)
  chr_status: EoiStatus;

  @IsOptional()
  @IsString()
  txt_notes?: string;
}