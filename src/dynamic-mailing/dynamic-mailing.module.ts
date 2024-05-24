import { Module, Provider } from '@nestjs/common';
import { EmailController} from "./application/controler/email.controler"
import { EmailService } from './application/services/email.service';
import {EmailSendingRepository} from './infrastructure/repository/emailSending.repository'
import {EmailLoggingRepository} from "./infrastructure/repository/emailLog.repository"
import { FormatForLogRepository } from './infrastructure/repository/formatForLoging.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLog, EmailLogSchema } from './infrastructure/schema/emailLog.schima';
import { FORMATFORLOG_REPOSITORY_TOKEN, MAILLOG_REPOSITORY_TOKEN, MAIL_REPOSITORY_TOKEN } from './domain/repository/repository.token';
const EmailSendingRepositoryProvider: Provider={
  provide: MAIL_REPOSITORY_TOKEN,
  useClass: EmailSendingRepository
}
const FormatForLogRepositoryProvider: Provider={
  provide: FORMATFORLOG_REPOSITORY_TOKEN,
  useClass: FormatForLogRepository
}
const EmailLoggingRepositoryProvider: Provider={
  provide: MAILLOG_REPOSITORY_TOKEN,
  useClass: EmailLoggingRepository
}
@Module({
  controllers: [EmailController],
  imports:[MongooseModule.forFeature([{ name: EmailLog.name, schema: EmailLogSchema }])],
  providers: [EmailService, EmailSendingRepositoryProvider, FormatForLogRepositoryProvider , EmailLoggingRepositoryProvider],
  exports:[EmailService]
})
export class DynamicMailingModule {}


