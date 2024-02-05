// nodemailer.provider.ts
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailProvider } from './email.provider.interface';

@Injectable()
export class NodeMailerProvider implements EmailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const mailOptions = {
      from: {
        name: process.env.NODEMAILER_NAME,
        address: process.env.NODEMAILER_EMAIL,
      }, //process.env.MAILER_EMAIL,
      to,
      subject,
      // html: '<h1>abdo</h1>',
      text: content,
    };
    console.log('Sending email by nodemailer ........');
    console.log('to : ', to);

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new ServiceUnavailableException(error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  async sendEmailAsHtml(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'myrgroupshop@gmail.com', //process.env.MAILER_EMAIL,
      to,
      subject,
      html,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new ServiceUnavailableException(error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
