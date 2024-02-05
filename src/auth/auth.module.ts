import { Module } from '@nestjs/common';
import { AdminAuthController } from './controllers/auth.dashboard.controller';
import { AdminAuthService } from './services/auth.admin.service';
import { UsersModule } from 'src/user/users.module';
import { UserOtpService } from './services/user-otp.service';
import { CustomerAuthService } from './services/auth.customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from './entities/user-otp.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { EmailService } from 'src/_common/services/email/email.service';
import { NodeMailerProvider } from 'src/_common/services/email/email-providers/nodemailer.email.provider';
import { SendGridProvider } from 'src/_common/services/email/email-providers/sendgrid.email.provider';
import { CustomerAuthController } from './controllers/auth.customer.controller';
import { SmsService } from 'src/_common/services/sms/test-sms-service';

@Module({
  imports: [UsersModule, CustomerModule, TypeOrmModule.forFeature([UserOtp])],
  controllers: [AdminAuthController, CustomerAuthController],
  providers: [
    AdminAuthService,
    UserOtpService,
    CustomerAuthService,
    EmailService,
    SmsService,
    {
      provide: 'NodeMailerProvider',
      useClass: NodeMailerProvider,
    },
    {
      provide: 'SendGridProvider',
      useClass: SendGridProvider,
    },
  ],
})
export class AuthModule {}
