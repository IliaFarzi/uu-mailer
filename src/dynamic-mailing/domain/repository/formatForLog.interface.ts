import { IEmailData } from '../interfaces/emailData.interface';
import { IEmailLog } from '../interfaces/emailLog.interface';

export interface IFormatForLogRepository {
  formatForLogging(emailData: IEmailData, result?: any): IEmailLog;
}
