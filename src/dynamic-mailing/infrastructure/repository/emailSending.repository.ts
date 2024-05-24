import { IEmailData } from "src/dynamic-mailing/domain/interfaces/emailData.interface";
import { IEmailSendingRepository } from "../../domain/repository/mail.interface";
import { Resend } from "resend";
import { SampleEmail } from "../email/sample.email";

export class EmailSendingRepository implements IEmailSendingRepository{
    async sendEmail(emailData: IEmailData): Promise<any> {
        const template = new SampleEmail()
        const filledTemplate = template.html_format.replace('{{body}}', emailData.body);
        // Send email using Resend API
        const resend = new Resend('re_MdL3gMqk_CZVQDgm1Qp1nV5kKKN14cYrM');
        const emailReqData = {
          from: 'onboarding@resend.dev',
          to: emailData.address,
          subject: emailData.title,
          html: filledTemplate,
        };
        const res = resend.emails.send(emailReqData)
        return res
    }

}