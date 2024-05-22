//this module was not designed as stand alone API controler here is for test of funtionality 

import { Controller, Post, Body, Get } from '@nestjs/common';
import { DynamicMailingService } from './dynamic-mailing.service';

@Controller('email')
export class DynamicMailingController {
  constructor(private readonly emailService: DynamicMailingService) {}

  @Post('send')
  async sendEmail(@Body() data: { address: string; title: string; body: string }) {
    return this.emailService.sendEmail(data);
  }
  @Get("logs")
  async getLogs(){
    return this.emailService.getLogs()
  }
}
