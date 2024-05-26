import { IsNotEmpty, IsEmail } from "@nestjs/class-validator";
import { IEmailDataForgotPassword, IEmailDataSignup } from "../../domain/interfaces/emailData.interface";

export class EmailDataSignupDto implements IEmailDataSignup {
    @IsNotEmpty()
    @IsEmail()
    to: string;
    @IsNotEmpty()
    data: {
        hash: string;   
    }

}

export class EmailDataForgotPasswordDto implements IEmailDataForgotPassword {
    @IsNotEmpty()
    @IsEmail()
    to: string;
    @IsNotEmpty()
    data: {
        hash: string;   
    }

}