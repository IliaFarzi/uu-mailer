import { IEmailLog } from '../interfaces/emailLog.interface';

export interface IEmailLoggingRepository {
  logEmail(logData: IEmailLog): Promise<any>;
  getAllLogs(): Promise<IEmailLog[]>;
}
