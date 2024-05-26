import { EmailSendingRepositoryInterface } from '../../domain/repository/email.interface';
import { Resend } from 'resend';
import { localConfig } from '../local-config/local-confing';
import {
  EmailDataForgotPasswordInterface,
  EmailDataSignupInterface,
} from '../../domain/interfaces/email-data.interface';

export class EmailSendingRepository implements EmailSendingRepositoryInterface {
  async sendUserSignupEmail(
    emailData: EmailDataSignupInterface,
    titel: string,
    html: string,
  ): Promise<boolean> {
    const sendingAgent = new Resend(localConfig.resendSetup.apiKey);
    try {
      const result = await sendingAgent.emails.send({
        from: localConfig.resendSetup.from,
        to: emailData.to,
        subject: titel,
        html,
      });
      if (result.error) {
        throw result.error;
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  async sendUserForgotPasswordEmail(
    emailData: EmailDataForgotPasswordInterface,
    titel: string,
    html: string,
  ): Promise<boolean> {
    const sendingAgent = new Resend(localConfig.resendSetup.apiKey);
    try {
      const result = await sendingAgent.emails.send({
        from: localConfig.resendSetup.from,
        to: emailData.to,
        subject: titel,
        html,
      });
      if (result.error) {
        throw result.error;
      }
      return true;
    } catch (error) {
      return error;
    }
  }
}
