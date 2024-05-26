import { IEmailDataSignup } from "../interfaces/emailData.interface";

export interface IEmailSendingRepository{
    sendUserSignupEmail(emailData: IEmailDataSignup , html : string): Promise<boolean>;
    sendUserForgotPasswordEmail(emailData: IEmailDataSignup, html:string): Promise<boolean>;
}