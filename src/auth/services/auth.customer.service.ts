import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { translateThis } from 'src/_common/utils/translate-this';
import { LoginOrSignupDto } from '../dto/login-or-signup.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { UserStatusEnum } from 'src/_common/enums/user_status.enum';
import { CustomerService } from 'src/customer/providers/customer.service';
import { createSuccessTranslated } from 'src/_common/utils/successResponseMessage.util';
import { OtpMessageDestination } from '../enum/message-sender.enum';
import { UserOtpService } from './user-otp.service';
import { EmailService } from 'src/_common/services/email/email.service';
import { SmsService } from 'src/_common/services/sms/test-sms-service';
import { SignupDto } from '../dto/signup.dto';
import { log } from 'console';

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly userOtpService: UserOtpService,
    private readonly emailService: EmailService,
    private readonly phoneService: SmsService,
  ) {} //private readonly emailService: EmailService,
  async loginOrSignup(loginOrSignupDto: LoginOrSignupDto | SignupDto) {
    let { user, otp_destination, country_code } = loginOrSignupDto;
    user = user.trim().toLocaleLowerCase();
    let createCustomerDto = new CreateCustomerDto();
    createCustomerDto.status = UserStatusEnum.ACTIVE;
    createCustomerDto.name = loginOrSignupDto['name'];
    createCustomerDto.email = loginOrSignupDto['email'];
    let query = {};
    try {
      if (otp_destination == OtpMessageDestination.EMAIL) {
        query['email'] = user;
        createCustomerDto.email = user;
      } else if (otp_destination == OtpMessageDestination.PHONE) {
        query['phone'] = user;
        createCustomerDto.phone = user;
        createCustomerDto.country_code = country_code;
      }

      console.log('loginOrSignup 22', query);
      let customer = await this.customerService.findOneEntity({
        where: query,
      });

      if (!customer) {
        let customerEntity =
          this.customerService.createEntity(createCustomerDto);
        customer = await this.customerService.saveEntityInstance(
          customerEntity,
        );
      }
      let otp: string = '';
      if (otp_destination == OtpMessageDestination.EMAIL) {
        otp = await this.saveAndSendOtpToEmail(loginOrSignupDto);
      } else if (otp_destination == OtpMessageDestination.PHONE) {
        otp = await this.saveAndSendOtpToPhone(loginOrSignupDto);
      }

      return { message: `Otp sent to your ${otp_destination}`, otp };
    } catch (error) {
      log(error);
      console.log(error.message);
      throw new UnprocessableEntityException('لا يمكن حفظ المستخدم');
    }
  }

  async verifyLoginOrSignup(loginOrSignupDto: LoginOrSignupDto) {
    const { country_code, otp, otp_destination, user } = loginOrSignupDto;
    let query = {};

    if (otp_destination == OtpMessageDestination.EMAIL) {
      query['email'] = user;
    } else if (otp_destination == OtpMessageDestination.PHONE) {
      query['phone'] = user;
      query['country_code'] = country_code;
    }
    try {
      let customer = await this.customerService.findOneEntityOrFail({
        where: query,
      });
      const isValide = await this.userOtpService.verifyOtp(loginOrSignupDto);

      let message = translateThis('auth.invalid_otp');

      if (!isValide) throw new UnauthorizedException(message);
      const token = await customer.generateToken();
      return {
        message: 'Successfully logged in.',
        data: { customer },
        meta: { token },
      };
    } catch (error) {
      throw new UnprocessableEntityException(
        error.message || "Can't verify your login",
      );
    }
  }

  async saveAndSendOtpToEmail(loginOrSignupDto: LoginOrSignupDto) {
    const { user, otp_destination } = loginOrSignupDto;
    const isExist = await this.customerService.findOneEntityOrFail({
      where: { email: user },
    });
    let message = translateThis('auth.email_not_found');
    console.log('isExist', isExist);

    if (!isExist) throw new NotFoundException(message);
    try {
      const generatedOtp = await this.userOtpService.createOtp({
        user,
        otp_destination,
      });
      /*  message = this.i18n.t('auth.otp_sent', {
        lang: requestLang,
      }); */
      await this.emailService.sendWelcomeAndOtp(user, generatedOtp);
      return generatedOtp;
    } catch (error) {
      message = translateThis('auth.otp_not_sent');

      throw new UnprocessableEntityException(error.message || message);
    }
  }
  async saveAndSendOtpToPhone(loginOrSignupDto: LoginOrSignupDto) {
    const { user, otp_destination, country_code } = loginOrSignupDto;
    const isExist = await this.customerService.findOneEntityOrFail({
      where: { phone: user },
    });

    let message = translateThis('auth.email_not_found');
    console.log('isExist', isExist);

    if (!isExist) throw new NotFoundException(message);
    try {
      const generatedOtp = await this.userOtpService.createOtp({
        user,
        otp_destination,
        country_code,
      });

      await this.phoneService.sendWelcomeAndOtp(
        `${country_code}${user}`,
        generatedOtp,
      );
      return generatedOtp;
    } catch (error) {
      message = translateThis('auth.otp_not_sent');

      throw new UnprocessableEntityException(error.message || message);
    }
  }
}
