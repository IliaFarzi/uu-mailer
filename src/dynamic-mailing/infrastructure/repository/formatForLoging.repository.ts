import { IEmailData } from "src/dynamic-mailing/domain/interfaces/emailData.interface";
import { IEmailLog } from "src/dynamic-mailing/domain/interfaces/emailLog.interface";
import { IFormatForLogRepository } from "src/dynamic-mailing/domain/repository/formatForLog.interface";
import { SampleEmail } from "../email/sample.email";
export class FormatForLogRepository implements IFormatForLogRepository{
    formatForLogging(emailData: IEmailData, result?: any): IEmailLog {
        let res: IEmailLog = {
            data: JSON.stringify(emailData),
            template: new SampleEmail().html_format,
            timeSent: new Date(),
            status: result && result.error ? "failure" : "success"
        }

        return res
    }
}