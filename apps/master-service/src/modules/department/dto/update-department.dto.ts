import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
    @IsString()
    @IsOptional()
    departmentName: string;

    @IsString()
    @IsOptional()
    departmentCode: string;

    @IsString()
    @IsOptional()
    description: string;
}
