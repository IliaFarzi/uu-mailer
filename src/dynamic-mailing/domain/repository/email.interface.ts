import {
  EmailDataForgotPasswordInterface,
  EmailDataSignupInterface,
} from '../interfaces/email-data.interface';

export interface EmailSendingRepositoryInterface {
  sendUserSignupEmail(
    emailData: EmailDataSignupInterface,
    titel: string,
    html: string,
  ): Promise<boolean>;
  sendUserForgotPasswordEmail(
    emailData: EmailDataForgotPasswordInterface,
    title: string,
    html: string,
  ): Promise<boolean>;
}
