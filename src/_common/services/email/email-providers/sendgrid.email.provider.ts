// sendgrid.provider.ts
import { Injectable } from "@nestjs/common";
//import * as sendgrid from '@sendgrid/mail';
import { EmailProvider } from "./email.provider.interface";

@Injectable()
export class SendGridProvider implements EmailProvider {
  constructor() {
    // sendgrid.setApiKey('your-sendgrid-api-key');
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const msg = {
      to,
      from: "your@example.com", // Set your verified sender email
      subject,
      text: content,
    };
    console.log("---- Sendgrid sending emails ----");
    //  await sendgrid.send(msg);
  }
  async sendEmailAsHtml(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const mailOptions = {
      from: "myrgroupshop@gmail.com", //process.env.MAILER_EMAIL,
      to,
      subject,
      html,
    };
  }
}
