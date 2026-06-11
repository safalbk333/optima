import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty({description: 'Name of the department',})
    @IsString()
    departmentName: string;

    @ApiProperty({description: 'Code of the department'})
    @IsString()
    departmentCode: string;

    @ApiProperty({description: 'Description of the department'})
    @IsString()
    description: string;
}
