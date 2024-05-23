import { Injectable } from "@nestjs/common";
import { IEmailLoggingRepository } from "src/dynamic-mailing/domain/repository/mailLog.interface";
import { IEmailLog } from "src/dynamic-mailing/domain/interfaces/emailLog.interface";
import { InjectModel } from "@nestjs/mongoose";
import { EmailLog } from "../schema/emailLog.schima";
import { Model } from "mongoose";

@Injectable()
export class EmailLoggingRepository implements IEmailLoggingRepository{
    constructor(@InjectModel(EmailLog.name) readonly emailLogModel: Model<EmailLog>){}
  
    async logEmail(emailData: IEmailLog): Promise<any> {
      const emailLog = new this.emailLogModel(emailData);
      return emailLog.save();
    }
    async getAllLogs(): Promise<IEmailLog[]> {
      return this.emailLogModel.find()
    }
}