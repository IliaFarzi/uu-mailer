import { Module } from '@nestjs/common';
import { EmailController} from "./application/controler/email.controler"
import { EmailService } from './application/services/email.service';
import {EmailSendingRepository} from './infrastructure/repository/emailSending.repository'
import {EmailLoggingRepository} from "./infrastructure/repository/emailLog.repository"
import { FormatForLogRepository } from './infrastructure/repository/formatForLoging.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLog, EmailLogSchema } from './infrastructure/schema/emailLog.schima';
@Module({
  controllers: [EmailController],
  imports:[MongooseModule.forFeature([{ name: EmailLog.name, schema: EmailLogSchema }])],
  providers: [EmailService, EmailSendingRepository, FormatForLogRepository , EmailLoggingRepository],
  exports:[EmailService]
})
export class DynamicMailingModule {}
