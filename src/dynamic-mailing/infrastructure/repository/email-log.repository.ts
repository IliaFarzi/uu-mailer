import { EmailLogRepositoryInterface } from '../../domain/repository/email-log.interface';
import { EmailLogInterface } from '../../domain/interfaces/email-log.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EmailLog } from '../schema/email-log.schima';
import { Model } from 'mongoose';

export class EmailLogRepository implements EmailLogRepositoryInterface {
  constructor(
    @InjectModel(EmailLog.name) readonly emailLogModel: Model<EmailLog>,
  ) {}

  async logEmail(emailData: EmailLogInterface): Promise<any> {
    // const emailLog = new this.emailLogModel(emailData);
    // return emailLog.save();
    throw new Error('Method not implemented.');
  }
  async getAllLogs(): Promise<EmailLogInterface[]> {
    // return this.emailLogModel.find();
    throw new Error('Method not implemented.');
  }
}
