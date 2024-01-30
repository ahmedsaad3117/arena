// email-provider.interface.ts
export interface EmailProvider {
  sendEmail(to: string, subject: string, content: string): Promise<void>;
  sendEmailAsHtml(to: string, subject: string, content: string): Promise<void>;
}
