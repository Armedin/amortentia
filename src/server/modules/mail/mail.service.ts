import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Order } from '../orders/order.entity';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);
  private smtpTransport = nodemailer.createTransport({
    //port: 465,
    port: 587,
    sendmail: true,
    host: process.env.STMP_HOST,
    secure: true,
    auth: {
      user: process.env.STMP_USER,
      pass: process.env.STMP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  private render(view: string, data: any) {
    return new Promise(async (resolve, reject) => {
      let emailTemplate = await this.fileToTemplate(view.replace('\\', '/'));
      let template = Handlebars.compile(emailTemplate.hbs);
      let html = template(data);
      return resolve(html);
    });
  }

  private fileToTemplate = async (fileName: string) => {
    let template = await this.getTemplateFromPath(
      path.join(__dirname, 'templates', `${fileName}.hbs`)
    );

    if (template && template.hbs) {
      return template;
    }
  };

  private async getTemplateFromPath(fullPath: string) {
    try {
      let template: any = {};
      let templatePath = fullPath.replace(/\\/g, '/').split('/');
      let fileExtension = templatePath[templatePath.length - 1].split(
        '.',
        2
      )[1];

      let fileContent = fs.readFileSync(fullPath, 'utf8');
      switch (fileExtension) {
        case 'hbs':
          template.hbs = fileContent;
          break;
        default:
          this.logger.warn(
            `${path} will be ignored. Only .hbs files are supported!`
          );
          break;
      }

      if (!template.hbs) {
        return;
      }

      return template;
    } catch (error) {
      this.logger.error('Something went wrong', error);
      return;
    }
  }

  private async send({
    template,
    locals,
    message,
  }: {
    template: string;
    locals: any;
    message: any;
  }) {
    await this.render(template, locals).then((html: string) => {
      message.html = html;
    });

    return await this.smtpTransport.sendMail({
      from: process.env.MAIL_FROM_ACCOUNT,
      to: process.env.MAIL_TO_ACCOUNT,
      subject: message.subject,
      html: message.html,
    });
  }

  public async sendOrderConfirmationMail(order: Order) {
    const sendOptions = {
      template: 'order-confirmation',
      message: {
        subject: 'New Order Confirmation',
      },
      locals: {
        orderId: order.id,
        shippingDetails: order.shipping_address,
        items: order.items.map(item => {
          return {
            title: item.title,
            quantity: item.quantity,
            total: `€${((item.price * item.quantity) / 100).toFixed(2)}`,
          };
        }),
        total: `€${(order.total / 100).toFixed(2)}`, // better to use formatAmountWithSymbol
      },
    };

    const emailStatus = await this.send(sendOptions);
    return true;
  }
}
