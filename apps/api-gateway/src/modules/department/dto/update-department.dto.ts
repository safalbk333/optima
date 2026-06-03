import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDepartmentDto {
    @ApiPropertyOptional({ description: 'Name of the department', })
    @IsOptional()
    @IsString()
    departmentName: string;

    @ApiPropertyOptional({ description: 'Code of the department' })
    @IsOptional()
    @IsString()
    departmentCode: string;

    @ApiPropertyOptional({ description: 'Description of the department' })
    @IsOptional()
    @IsString()
    description: string;
}
