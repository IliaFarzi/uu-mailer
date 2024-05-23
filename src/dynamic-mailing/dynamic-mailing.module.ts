import { Module } from '@nestjs/common';
import { EmailController} from "./application/controler/email.controler"
import { EmailService } from './application/services/email.service';
import {EmailSendingRepository} from './infrastructure/repository/emailSending.repository'
import {EmailLoggingRepository} from "./infrastructure/repository/emailLog.repository"
import { FormatForLogRepository } from './infrastructure/repository/formatForLoging.repository';
@Module({
  controllers: [EmailController],
  providers: [EmailService, EmailSendingRepository, FormatForLogRepository , EmailLoggingRepository],
  exports:[EmailService]
})
export class DynamicMailingModule {}
