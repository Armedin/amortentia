import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { MailService } from './modules/mail/mail.service';

@Controller('api')
export class AppController {
  @Get('')
  async doSmth() {
    return 'ok';
  }
}
