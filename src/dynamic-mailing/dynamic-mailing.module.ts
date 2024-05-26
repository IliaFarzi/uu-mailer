import { Module, Provider } from '@nestjs/common';
import { EmailController } from './application/controller/email.controller';
import { EmailService } from './application/services/email.service';
import { EmailSendingRepository } from './infrastructure/repository/email-sending.repository';
import { EmailLogRepository } from './infrastructure/repository/email-log.repository';
import { FormatForLogRepository } from './infrastructure/repository/format-for-loging.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailLog,
  EmailLogSchema,
} from './infrastructure/schema/email-log.schima';
import {
  FORMATFORLOG_REPOSITORY_TOKEN,
  MAILLOG_REPOSITORY_TOKEN,
  MAIL_PREPRATION_REPOSITORY_TOKEN,
  MAIL_REPOSITORY_TOKEN,
} from './domain/repository/repository.token';
import { EmailPreparationRepository } from './infrastructure/repository/email-preparation.repository';
const EmailSendingRepositoryProvider: Provider = {
  provide: MAIL_REPOSITORY_TOKEN,
  useClass: EmailSendingRepository,
};
const FormatForLogRepositoryProvider: Provider = {
  provide: FORMATFORLOG_REPOSITORY_TOKEN,
  useClass: FormatForLogRepository,
};
const EmailLoggingRepositoryProvider: Provider = {
  provide: MAILLOG_REPOSITORY_TOKEN,
  useClass: EmailLogRepository,
};
const EmailPreparationRepositoryProvider: Provider = {
  provide: MAIL_PREPRATION_REPOSITORY_TOKEN,
  useClass: EmailPreparationRepository,
};
@Module({
  controllers: [EmailController],
  imports: [
    MongooseModule.forFeature([
      { name: EmailLog.name, schema: EmailLogSchema },
    ]),
  ],
  providers: [
    EmailService,
    EmailSendingRepositoryProvider,
    FormatForLogRepositoryProvider,
    EmailLoggingRepositoryProvider,
    EmailPreparationRepositoryProvider,
  ],
  exports: [EmailService],
})
export class DynamicMailingModule {}
