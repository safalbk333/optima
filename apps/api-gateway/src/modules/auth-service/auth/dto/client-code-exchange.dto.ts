import { IsString } from "class-validator";


export class ClientCodeExchangeDto {
    @IsString()
    code: string;
}