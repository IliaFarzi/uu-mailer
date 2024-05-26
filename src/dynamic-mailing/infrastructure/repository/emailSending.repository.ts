import { IEmailData } from "src/dynamic-mailing/domain/interfaces/emailData.interface";
import { IEmailSendingRepository } from "../../domain/repository/mail.interface";
import { Resend } from "resend";
import { SampleEmail } from "../email/sample.email";
import { localConfig } from "../local-config/local-confing";

export class EmailSendingRepository implements IEmailSendingRepository{
    async sendEmail(emailData: IEmailData): Promise<any> {
        const template = new SampleEmail()
        const filledTemplate = template.html_format.replace('{{body}}', emailData.body);
        // Send email using Resend API
        const resend = new Resend(localConfig.resendSetup.apiKey);
        const emailReqData = {
          from: localConfig.resendSetup.from,
          to: emailData.address,
          subject: emailData.title,
          html: filledTemplate,
        };
        const res = resend.emails.send(emailReqData)
        return res
    }

}