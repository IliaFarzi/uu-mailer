import { IEmailLog } from "../interfaces/emailLog.interface";

export interface IEmailLoggingRepository{
    logEmail(emailData: IEmailLog): Promise<any>;
    getAllLogs(): Promise<IEmailLog[]>;
}