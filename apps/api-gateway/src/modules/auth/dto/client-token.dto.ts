import { IsString } from 'class-validator';

export class ClientTokenDto {
    @IsString()
    clientId: string;

    @IsString()
    clientSecret: string;
}