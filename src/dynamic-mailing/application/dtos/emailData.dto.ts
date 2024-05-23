import { IsNotEmpty, IsString, IsEmail } from "@nestjs/class-validator";
import { IEmailData } from "../../domain/interfaces/emailData.interface";

export class EmailDataDto implements IEmailData {
    @IsNotEmpty()
    @IsEmail()
    address: string;
    @IsEmail()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    body: string;
}