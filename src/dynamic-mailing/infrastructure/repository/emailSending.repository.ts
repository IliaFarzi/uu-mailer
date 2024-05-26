import { IEmailSendingRepository } from '../../domain/repository/mail.interface';
import { Resend } from 'resend';
import { SampleEmail } from '../email/sample.email';
import { localConfig } from '../local-config/local-confing';
import { IEmailDataForgotPassword, IEmailDataSignup } from 'src/dynamic-mailing/domain/interfaces/emailData.interface';

export class EmailSendingRepository implements IEmailSendingRepository {
  async sendUserSignupEmail(emailData: IEmailDataSignup, titel: string, html: string): Promise<boolean> {
      const sendingAgent = new Resend(localConfig.resendSetup.apiKey)
      try{
        const result = await  sendingAgent.emails.send({
          from: localConfig.resendSetup.from,
          to: emailData.to,
          subject: titel,
          html
        })
        if(result.error){
          throw result.error
        }
        return true
      }catch(error){
        return error
      }

}
async sendUserForgotPasswordEmail(emailData: IEmailDataForgotPassword, titel: string, html: string): Promise<boolean> {
  const sendingAgent = new Resend(localConfig.resendSetup.apiKey)
  try{
    const result = await  sendingAgent.emails.send({
      from: localConfig.resendSetup.from,
      to: emailData.to,
      subject: titel,
      html
    })
    if(result.error){
      throw result.error
    }
    return true
  }catch(error){
    return error
  }
}
}
