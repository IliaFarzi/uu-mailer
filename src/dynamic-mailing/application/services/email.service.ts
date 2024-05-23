import { Injectable } from "@nestjs/common";
import { IEmailData } from "../../domain/interfaces/emailData.interface";
import { IEmailLog } from "../../domain/interfaces/emailLog.interface";
import { EmailSendingRepository } from "../../infrastructure/repository/emailSending.repository";
import { EmailLoggingRepository } from "../../infrastructure/repository/emailLog.repository"; 
import { FormatForLogRepository } from "../../infrastructure/repository/formatForLoging.repository";

@Injectable()
export class EmailService {
  constructor(readonly emailSendingRepository: EmailSendingRepository, 
    readonly emailLoggingRepository: EmailLoggingRepository,
    readonly formatForogRepository:FormatForLogRepository) {}
    async sendEmail(emailData: IEmailData): Promise<any> {
        try {
            const result = await this.emailSendingRepository.sendEmail(emailData);
            const emailLog:IEmailLog =  this.formatForogRepository.formatForLogging(emailData, result);
            await this.emailLoggingRepository.logEmail(emailLog);
            return result;
        } catch (error) {
            const emailLog:IEmailLog = await this.formatForogRepository.formatForLogging(emailData);
            await this.emailLoggingRepository.logEmail(emailLog);
            throw error;
        }
    }
    async getLogs(): Promise<IEmailLog[]> {
        return this.emailLoggingRepository.getAllLogs();
    }
}