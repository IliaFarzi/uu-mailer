import { IEmailPreprationRepository, IForgotPasswordTextData, ISignupTextData } from "src/dynamic-mailing/domain/repository/mailPrepration.interface";
import { I18nContext } from "nestjs-i18n";
import fs from 'node:fs/promises';
import { IEmailDataForgotPassword, IEmailDataSignup } from "src/dynamic-mailing/domain/interfaces/emailData.interface";
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import path from 'path';
import Handlebars from 'handlebars';

@Injectable()
export class EmailPreprationRepository implements IEmailPreprationRepository{
    constructor(private readonly configService: ConfigService) {}
    async userSignUpI18n(): Promise<ISignupTextData> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: string | undefined;
    let text1: string | undefined;
    let text2: string | undefined;
    let text3: string | undefined;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }
    return {emailConfirmTitle, text1, text2, text3}
    }
    userSignUpComfermationUrl(mailData: IEmailDataSignup): URL {
        const url = new URL(
            this.configService.getOrThrow('app.frontendDomain', {
              infer: true,
            }) + '/confirm-email',
          );
          url.searchParams.set('hash', mailData.data.hash);
          return url
    }
    async userForgotPasswordI18n(): Promise<IForgotPasswordTextData> {
        const i18n = I18nContext.current();
        let resetPasswordTitle: string | undefined;
        let text1: string | undefined;
        let text2: string | undefined;
        let text3: string | undefined;
        let text4: string | undefined;
    
        if (i18n) {
          [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
            i18n.t('common.resetPassword'),
            i18n.t('reset-password.text1'),
            i18n.t('reset-password.text2'),
            i18n.t('reset-password.text3'),
            i18n.t('reset-password.text4'),
          ]);
        }
        return {resetPasswordTitle, text1, text2, text3, text4}
    }
    userForgotPasswordComfermationUrl(mailData: IEmailDataForgotPassword): URL {
        const url = new URL(
            this.configService.getOrThrow('app.frontendDomain', {
              infer: true,
            }) + '/password-change',
          );
          url.searchParams.set('hash', mailData.data.hash);
          return url
    
    
    }
    async renderTemplate(templateType: string, data: any): Promise<string> {
          try{
            const templatePath = path.join(
                this.configService.getOrThrow('app.workingDirectory', {
                  infer: true,
                }),
                'src',
                'dynamic-mailing',
                'email',
                templateType + '.hbs',
              )
            const app_name =  this.configService.get('app.name', {
                infer: true,
              })
            const template = await fs.readFile(templatePath, 'utf-8');
            const html = Handlebars.compile(template, {strict: true})({...data, app_name});
            return html
          }catch(error){
            throw error
          }

    }


}