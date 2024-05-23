import { IEmailData } from "../interfaces/emailData.interface";

export interface IEmailSendingRepository{
    sendEmail(emailData: IEmailData): Promise<any>;
}