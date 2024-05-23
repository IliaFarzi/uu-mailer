import { Injectable } from "@nestjs/common";
import { IEmailData } from "../../domain/interfaces/emailData.interface";
import { IEmailSendingRepository } from "../../domain/repository/mail.interface";
import { IEmailLoggingRepository } from "../../domain/repository/mailLog.interface";
import { IEmailLog } from "../../domain/interfaces/emailLog.interface";
import { IFormatForLogRepository } from "../../domain/repository/formatForLog.interface";

@Injectable()
export class EmailService {
  constructor(readonly emailSendingRepository: IEmailSendingRepository, 
    readonly emailLoggingRepository: IEmailLoggingRepository,
    readonly formatForogRepository:IFormatForLogRepository) {}
    async sendEmail(emailData: IEmailData): Promise<any> {
        try {
            const result = await this.emailSendingRepository.sendEmail(emailData);
            const emailLog:IEmailLog = await this.formatForogRepository.formatForLogging(emailData, result);
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