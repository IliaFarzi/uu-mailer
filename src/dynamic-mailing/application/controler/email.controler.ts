//this module was not designed as stand alone API controler here is for test of funtionality 

import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from '../services/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() data: { address: string; title: string; body: string }) {
    return this.emailService.sendEmail(data);
  }
  @Get("logs")
  async getLogs(){
    return this.emailService.getLogs()
  }
}