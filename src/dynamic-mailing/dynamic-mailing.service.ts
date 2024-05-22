import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailLog } from './schemas/emailLog.schema';
import { Resend} from 'resend';
import { SampleEmail } from './email_templates/sampel.email';

@Injectable()
export class DynamicMailingService {
  constructor(
    @InjectModel(EmailLog.name) private emailLogModel: Model<EmailLog>
  ) {}

  async sendEmail(data: { address: string; title: string; body: string }){
    // Read template file

    const template = new SampleEmail()
    const filledTemplate = template.html_format.replace('{{body}}', data.body);
    // Send email using Resend API
    const resend = new Resend('re_MdL3gMqk_CZVQDgm1Qp1nV5kKKN14cYrM');
    const emailData = {
      from: 'onboarding@resend.dev',
      to: data.address,
      subject: data.title,
      html: filledTemplate,
    };
    try {
      // console.log("tried")
      // Send email using Resend API
      // console.log("sending",emailData.to)
      const response:any = await resend.emails.send(emailData)  ;
      // console.log("sent")
      // Check for 'id' in response
      const status = response.error ? 'failure' : 'success';

      // Record the result in MongoDB
      console.log("recording" , status)
      const emailLog = new this.emailLogModel({
        data: JSON.stringify(data),
        template: template.html_format,
        timeSent: new Date(),
        status: status,
      });
      // console.log("recorded")
      await emailLog.save();
      // console.log("saved")

      return response;
    } catch (error) {
      // console.log("error")
      // console.log("recording")
      const emailLog = new this.emailLogModel({
        data: JSON.stringify(data),
        template: template.html_format,
        timeSent: new Date(),
        status: 'failed',
      });
      // console.log("recorded")

      await emailLog.save();
      // console.log("saved")

      throw error;
    }
  }
  async getLogs(){
    return this.emailLogModel.find()
  }
}
