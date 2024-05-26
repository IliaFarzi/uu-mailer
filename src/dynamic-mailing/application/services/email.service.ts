import { Inject, Injectable } from '@nestjs/common';
// import { EmailLogInterface } from '../../domain/interfaces/email-log.interface';
import {
  // FORMATFORLOG_REPOSITORY_TOKEN,
  // MAILLOG_REPOSITORY_TOKEN,
  MAIL_PREPRATION_REPOSITORY_TOKEN,
  MAIL_REPOSITORY_TOKEN,
} from 'src/dynamic-mailing/domain/repository/repository.token';
import { EmailSendingRepositoryInterface } from '../../domain/repository/email.interface';
// import { EmailLogRepositoryInterface } from '../../domain/repository/email-log.interface';
// import { FormatForLogRepositoryInterface } from '../../domain/repository/format-for-log.interface';
import {
  EmailDataForgotPasswordDto,
  EmailDataSignupDto,
} from '../dtos/email-data.dto';
import { EmailPreparationRepositoryInterface } from '../../domain/repository/email-preparation.interface';

@Injectable()
export class EmailService {
  constructor(
    @Inject(MAIL_REPOSITORY_TOKEN)
    readonly emailSendingRepository: EmailSendingRepositoryInterface,
    @Inject(MAIL_PREPRATION_REPOSITORY_TOKEN)
    readonly emailPreparationRepository: EmailPreparationRepositoryInterface,
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
  async userSignUp(emailData: EmailDataSignupDto): Promise<boolean> {
    try {
      const textData = await this.emailPreparationRepository.userSignUpI18n();
      const url =
        this.emailPreparationRepository.userSignUpComfermationUrl(emailData);
      const html = await this.emailPreparationRepository.renderTemplate(
        'activation',
        { ...textData, url },
      );
      const result = await this.emailSendingRepository.sendUserSignupEmail(
        emailData,
        textData.emailConfirmTitle,
        html,
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
  async userForgotPassword(
    emailData: EmailDataForgotPasswordDto,
  ): Promise<boolean> {
    try {
      const textData =
        await this.emailPreparationRepository.userForgotPasswordI18n();
      const url =
        this.emailPreparationRepository.userForgotPasswordComfermationUrl(
          emailData,
        );
      const html = await this.emailPreparationRepository.renderTemplate(
        'rest-password',
        { ...textData, url },
      );
      const result =
        await this.emailSendingRepository.sendUserForgotPasswordEmail(
          emailData,
          textData.resetPasswordTitle,
          html,
        );
      return true;
    } catch (error) {
      throw error;
    }
  }
}
