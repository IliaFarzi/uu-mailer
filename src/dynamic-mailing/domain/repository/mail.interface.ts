import { IEmailDataSignup } from '../interfaces/emailData.interface';

export interface IEmailSendingRepository {
  sendUserSignupEmail(
    emailData: IEmailDataSignup,
    titel: string,
    html: string,
  ): Promise<boolean>;
  sendUserForgotPasswordEmail(
    emailData: IEmailDataSignup,
    title:string,
    html: string,
  ): Promise<boolean>;
}
