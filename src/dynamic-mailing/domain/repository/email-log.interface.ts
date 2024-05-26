import { EmailLogInterface } from '../interfaces/email-log.interface';

export interface EmailLogRepositoryInterface {
  logEmail(logData: EmailLogInterface): Promise<boolean>;
  getAllLogs(): Promise<EmailLogInterface[]>;
}
