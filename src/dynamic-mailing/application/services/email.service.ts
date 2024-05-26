import { Inject, Injectable } from "@nestjs/common";
import { IEmailLog } from "../../domain/interfaces/emailLog.interface";
import { FORMATFORLOG_REPOSITORY_TOKEN, MAILLOG_REPOSITORY_TOKEN, MAIL_PREPRATION_REPOSITORY_TOKEN, MAIL_REPOSITORY_TOKEN } from "src/dynamic-mailing/domain/repository/repository.token";
import { IEmailSendingRepository } from "src/dynamic-mailing/domain/repository/mail.interface";
import { IEmailLoggingRepository } from "src/dynamic-mailing/domain/repository/mailLog.interface";
import { IFormatForLogRepository } from "src/dynamic-mailing/domain/repository/formatForLog.interface";
import { EmailDataForgotPasswordDto, EmailDataSignupDto } from "../dtos/emailData.dto";
import { promises } from "dns";
import { IEmailPreprationRepository } from "src/dynamic-mailing/domain/repository/mailPrepration.interface";

@Injectable()
export class EmailService {
  constructor(
    @Inject(MAIL_REPOSITORY_TOKEN)
    readonly emailSendingRepository: IEmailSendingRepository, 
    @Inject(MAIL_PREPRATION_REPOSITORY_TOKEN)
    readonly mailPreparationRepository: IEmailPreprationRepository
        ,
    // @Inject(MAILLOG_REPOSITORY_TOKEN)
    // readonly emailLoggingRepository: IEmailLoggingRepository,
    // @Inject(FORMATFORLOG_REPOSITORY_TOKEN)
    // readonly formatForogRepository:IFormatForLogRepository
) {}
    // async sendEmail(emailData: IEmailData): Promise<any> {
    //     try {
    //         const result = await this.emailSendingRepository.sendEmail(emailData);
    //         const emailLog:IEmailLog =  this.formatForogRepository.formatForLogging(emailData, result);
    //         await this.emailLoggingRepository.logEmail(emailLog);
    //         return result;
    //     } catch (error) {
    //         const emailLog:IEmailLog = await this.formatForogRepository.formatForLogging(emailData);
    //         await this.emailLoggingRepository.logEmail(emailLog);
    //         throw error;
    //     }
    // }
    // async getLogs(): Promise<IEmailLog[]> {
    //     return this.emailLoggingRepository.getAllLogs();
    // }
    async userSignUp(emailData: EmailDataSignupDto) : Promise<boolean>{
        try{
            const textData = await this.mailPreparationRepository.userSignUpI18n();
            const url = this.mailPreparationRepository.userSignUpComfermationUrl(emailData);
            const html = await this.mailPreparationRepository.renderTemplate('signup', {...textData, url, templateType:"signup"});
            const result = await this.emailSendingRepository.sendUserSignupEmail(emailData, html)
            return true
        }catch(error){
            throw error
        }
    }
    async userForgotPassword(emailData: EmailDataForgotPasswordDto): Promise<boolean>{
        try{
            const textData = await this.mailPreparationRepository.userForgotPasswordI18n();
            const url = this.mailPreparationRepository.userForgotPasswordComfermationUrl(emailData);
            const html = await this.mailPreparationRepository.renderTemplate('forgotPassword', {...textData, url, templateType:"forgotPassword"});
            const result = await this.emailSendingRepository.sendUserForgotPasswordEmail(emailData, html)
            return true
        }catch(error){
            throw error
        }
    }
}