import { EmailDataSignupInterface } from '../../domain/interfaces/email-data.interface';
import { EmailLogInterface } from '../../domain/interfaces/email-log.interface';
import { FormatForLogRepositoryInterface } from '../../domain/repository/format-for-log.interface';
export class FormatForLogRepository implements FormatForLogRepositoryInterface {
  formatForLog(
    emailData: EmailDataSignupInterface,
    result?: any,
  ): EmailLogInterface {
    //   let res: EmailDataSignupInterface = {
    //     data: JSON.stringify(emailData),
    //     template: new SampleEmail().html_format,
    //     timeSent: new Date(),
    //     status: result && result.error ? 'failure' : 'success',
    //   };

    //   return res;
    throw new Error('Method not implemented.');
  }
}
