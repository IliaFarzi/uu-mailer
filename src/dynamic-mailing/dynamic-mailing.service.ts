import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailLog } from './schemas/emailLog.schema';
import { Resend} from 'resend';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DynamicMailingService {
  constructor(
    @InjectModel(EmailLog.name) private emailLogModel: Model<EmailLog>
  ) {}

  async sendEmail(data: { address: string; title: string; body: string }){
    // Read template file
    const templatePath = path.join(__dirname, 'templates', 'email-template.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    const resend = new Resend('YOUR_API_KEY');

    const filledTemplate = template.replace('{{body}}', data.body);

    // Send email using Resend API
    const emailData = {
      from: 'onboarding@resend.dev',
      to: data.address,
      subject: data.title,
      html: filledTemplate,
    };

    try {
      // Send email using Resend API
      const response:any = await resend.emails.send(emailData)  ;
      
      // Check for 'id' in response
      const status = response.id ? 'success' : 'failure';

      // Record the result in MongoDB
      const emailLog = new this.emailLogModel({
        data: JSON.stringify(data),
        template: template,
        timeSent: new Date(),
        status: status,
      });

      await emailLog.save();

      return response;
    } catch (error) {
      const emailLog = new this.emailLogModel({
        data: JSON.stringify(data),
        template: template,
        timeSent: new Date(),
        status: 'failed',
      });

      await emailLog.save();

      throw error;
    }
  }
}
