import { IEmailDataForgotPassword, IEmailDataSignup } from "../interfaces/emailData.interface";

interface ISignupTextData{
    emailConfirmTitle: string;
    text1: string;
    text2: string;
    text3: string;

}
interface IForgotPasswordTextData{
    emailConfirmTitle: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string
}
export interface IEmailPreprationRepository {
    userSignUpI18n(): Promise<ISignupTextData>;
    userSignUpComfermationUrl(mailData: IEmailDataSignup): URL;
    userForgotPasswordI18n(): Promise<IForgotPasswordTextData>;
    userForgotPasswordComfermationUrl(mailData: IEmailDataForgotPassword): URL;
    renderTemplate(templatePath: string, data: any): Promise<string>;
}