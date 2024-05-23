import { Injectable } from "@nestjs/common";
import { IEmailData } from "src/dynamic-mailing/domain/interfaces/emailData.interface";
import { IEmailLog } from "src/dynamic-mailing/domain/interfaces/emailLog.interface";
import { IFormatForLogRepository } from "src/dynamic-mailing/domain/repository/formatForLog.interface";
import { SampleEmail } from "../email/sample.email";
@Injectable()
export class FormatForLogRepository implements IFormatForLogRepository{
    formatForLogging(emailData: IEmailData, result?: any): IEmailLog {
        let res:IEmailLog; 
        if(!result || result.error){
            res.status = "failure"
        }else{
            res.status = "success"
        }
        res.data = JSON.stringify(emailData)
        res.template = new SampleEmail().html_format

        return res
    }
}