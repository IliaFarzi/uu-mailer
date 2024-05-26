import {
  EmailDataSignupInterface,
  EmailDataForgotPasswordInterface,
} from '../interfaces/email-data.interface';

export interface SignupTextDataInterface {
  emailConfirmTitle: string;
  text1: string;
  text2: string;
  text3: string;
}
export interface ForgotPasswordTextDataInterface {
  resetPasswordTitle: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
export interface EmailPreparationRepositoryInterface {
  userSignUpI18n(): Promise<SignupTextDataInterface>;
  userSignUpComfermationUrl(mailData: EmailDataSignupInterface): URL;
  userForgotPasswordI18n(): Promise<ForgotPasswordTextDataInterface>;
  userForgotPasswordComfermationUrl(
    mailData: EmailDataForgotPasswordInterface,
  ): URL;
  renderTemplate(templateType: string, data: any): Promise<string>;
}
