import { Inject, Injectable } from "@nestjs/common";
import { IEmailData } from "../../domain/interfaces/emailData.interface";
import { IEmailLog } from "../../domain/interfaces/emailLog.interface";
import { FORMATFORLOG_REPOSITORY_TOKEN, MAILLOG_REPOSITORY_TOKEN, MAIL_REPOSITORY_TOKEN } from "src/dynamic-mailing/domain/repository/repository.token";
import { IEmailSendingRepository } from "src/dynamic-mailing/domain/repository/mail.interface";
import { IEmailLoggingRepository } from "src/dynamic-mailing/domain/repository/mailLog.interface";
import { IFormatForLogRepository } from "src/dynamic-mailing/domain/repository/formatForLog.interface";

@Injectable()
export class EmailService {
  constructor(
    @Inject(MAIL_REPOSITORY_TOKEN)
    readonly emailSendingRepository: IEmailSendingRepository, 
    @Inject(MAILLOG_REPOSITORY_TOKEN)
    readonly emailLoggingRepository: IEmailLoggingRepository,
    @Inject(FORMATFORLOG_REPOSITORY_TOKEN)
    readonly formatForogRepository:IFormatForLogRepository) {}
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