import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLog, EmailLogSchema } from './schemas/emailLog.schema';
import { DynamicMailingService } from './dynamic-mailing.service';
import { DynamicMailingController } from './dynamic-mailing.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmailLog.name, schema: EmailLogSchema }]),
  ],
  controllers: [DynamicMailingController],
  providers: [DynamicMailingService],
})
export class DynamicMailingModule {}
