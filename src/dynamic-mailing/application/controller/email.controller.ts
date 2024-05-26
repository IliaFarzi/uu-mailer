//this module was not designed as stand alone API controller here is for test of funtionality

import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import {
  EmailDataForgotPasswordDto,
  EmailDataSignupDto,
} from '../dtos/email-data.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('singup')
  async signup(@Body() data: EmailDataSignupDto) {
    return this.emailService.userSignUp(data);
  }
  @Post('forget')
  async forgetPassword(@Body() data: EmailDataForgotPasswordDto) {
    return this.emailService.userForgotPassword(data);
  }

  // @Get('logs')
  // async getLogs() {
  //   return this.emailService.getLogs();
  // }
}
