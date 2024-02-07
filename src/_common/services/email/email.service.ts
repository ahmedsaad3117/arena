// email.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { EmailProvider } from './email-providers/email.provider.interface';
import Config from 'src/_common/config/config';
import { sendOtpHtmlContent } from 'src/_common/html-factory/otp-html';

@Injectable()
export class EmailService {
  constructor(
    @Inject('NodeMailerProvider')
    private readonly nodeMailerProvider: EmailProvider,
    @Inject('SendGridProvider')
    private readonly sendGridProvider: EmailProvider,
  ) {}
  //----------------------------------------------------------------------base
  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    let provider = Config.MAILER_PROVIDER;
    const selectedProvider =
      provider === 'sendgrid' ? this.sendGridProvider : this.nodeMailerProvider;
    await selectedProvider.sendEmail(to, subject, content);
  }
  async sendEmailAsHtml(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    let provider = Config.MAILER_PROVIDER;
    const selectedProvider =
      provider === 'nodemailer'
        ? this.nodeMailerProvider
        : this.sendGridProvider;
    await selectedProvider.sendEmailAsHtml(to, subject, html);
  }
  //----------------------------------------------------------------- helpers
  async sendWelcomeEmail(to: string, content: string) {
    const subject = 'Welcome to Arena';
    content = ` Welcome to Arena`;
    await this.sendEmail(to, subject, content);
  }
  async sendWelcomeAndOtp(to: string, content: string) {
    const subject = 'Welcome to Arena';
    content = sendOtpHtmlContent(content);
    await this.sendEmailAsHtml(to, subject, content);
  }
  async sendResetPasswordOtp(to: string, content: string) {
    const subject = 'Reset your password at Arena';
    content = `You have requested to reset your password \n your otp is ${content}`;
    await this.sendEmail(to, subject, content);
  }
  async sendWelcomeEmpAndPass(to: string, password: string) {
    const subject = 'Welcome to Arena family';
    const content = `you have been assigned to be an employee on one of our stores \n and your credentials is \n user: ${to} \n password: ${password}`;
    await this.sendEmail(to, subject, content);
  }
  async sendWelcomeMerchentAndPass(to: string, password: string) {
    const subject = 'Welcome to Arena family';
    const content = `
    Your Account and store were created by one of our admins, and here are your credentials: \n user: ${to} \n password: ${password}`;
    await this.sendEmail(to, subject, content);
  }
}
/*
// email.module.ts
import { Module } from '@nestjs/common';
import { NodeMailerProvider } from './nodemailer.provider';
import { SendGridProvider } from './sendgrid.provider';
import { EmailService } from './email.service';

@Module({
  providers: [
    {
      provide: 'NodeMailerProvider',
      useClass: NodeMailerProvider,
    },
    {
      provide: 'SendGridProvider',
      useClass: SendGridProvider,
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}

*/
