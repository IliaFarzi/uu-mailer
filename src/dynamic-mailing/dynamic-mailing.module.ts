import { Module } from '@nestjs/common';
import { EmailController} from "./application/controler/email.controler"
import { EmailService } from './application/services/email.service';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailService],
  exports:[EmailService]
})
export class DynamicMailingModule {}
