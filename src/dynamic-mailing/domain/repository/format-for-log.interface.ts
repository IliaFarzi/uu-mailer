import { EmailDataSignupInterface } from '../interfaces/email-data.interface';
import { EmailLogInterface } from '../interfaces/email-log.interface';

export interface FormatForLogRepositoryInterface {
  formatForLog(
    emailData: EmailDataSignupInterface,
    result?: any,
  ): EmailLogInterface;
}
