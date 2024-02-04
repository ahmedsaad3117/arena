import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersBaseService } from 'src/user/providers/users.base.service';
import { RolesService } from 'src/roles/providers/roles.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserStatusEnum } from 'src/_common/enums/user_status.enum';

//import { EmailService } from 'src/_common/services/email/email.service';
import { AppUserType } from 'src/_common/enums/app_user_types.enum';
import { OtpTypesEnum } from 'src/_common/enums/otp_types.enum';
import {
  createSuccessAutoTranslated,
  notFoundErrorAutoTranslatedString,
} from 'src/_common/utils/successResponseMessage.util';
import { hashPasswordUtil } from 'src/_common/utils/hash-passwrod.util';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { translateThis } from 'src/_common/utils/translate-this';
import { UserEntity } from 'src/user/entities/users.entity';
import { LoginOrSignupDto } from '../dto/login-or-signup.dto';
import { SignupDto } from '../dto/signup.dto';
import { OtpMessageDestination } from '../enum/message-sender.enum';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CustomerAuthService } from './auth.customer.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly usersService: UsersBaseService, //private readonly emailService: EmailService,
    private readonly customerAuthService: CustomerAuthService,
  ) {}

  async login(loginDto: LoginDto) {
    const { user: username, password } = loginDto;

    const user: UserEntity = await this.usersService.findOne(null, [
      {
        email: username,
      },
      {
        phone: username,
      },
    ]);
    if (!user)
      throw new UnauthorizedException({
        message: 'Credentials is incorrect!',
      });
    const isPasswordCorrect = await user.isCorrectPassword(password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException({
        message: 'Credentials is incorrect!',
      });
    if (user.status === UserStatusEnum.DEACTIVE)
      throw new UnauthorizedException({
        message: 'Please activate/verify your account first.',
      });

    const token = await user.generateToken();
    const populatedUser = await this.usersService.findOnePopulated(user.id);
    const message = translateThis('auth.user_loggedin');
    return {
      message: message,
      data: {
        user: populatedUser.data,
      },
      meta: {
        token,
      },
    };
  }

  async loginOrSignup(loginOrSignupDto: LoginOrSignupDto | SignupDto) {
    let { user, otp_destination, country_code } = loginOrSignupDto;
    user = user.trim().toLocaleLowerCase();
    let createUserDto = new CreateUserDto();
    createUserDto.status = UserStatusEnum.ACTIVE;
    createUserDto.name = loginOrSignupDto['name'];
    createUserDto.email = loginOrSignupDto['email'];
    createUserDto.phone = loginOrSignupDto['phone'];
    let query = {};
    try {
      if (otp_destination == OtpMessageDestination.EMAIL) {
        query['email'] = user;
        createUserDto.email = user;
      } else if (otp_destination == OtpMessageDestination.PHONE) {
        query['phone'] = user;
        createUserDto.phone = user;
        createUserDto.country_code = country_code;
      }

      console.log('loginOrSignup 22', query);

      let newUser = await this.usersService.findOne(null, query);

      if (!newUser) {
        let customerEntity = this.usersService.create(createUserDto);
        newUser = await this.usersService.create(createUserDto);
      }

      let otp: string = '';
      if (otp_destination == OtpMessageDestination.EMAIL) {
        otp = await this.customerAuthService.saveAndSendOtpToEmail(
          loginOrSignupDto,
        );
      } else if (otp_destination == OtpMessageDestination.PHONE) {
        otp = await this.customerAuthService.saveAndSendOtpToPhone(
          loginOrSignupDto,
        );
      }

      return { message: `Otp sent to your ${otp_destination}`, otp };
    } catch (error) {
      console.log(error.message);
      throw new UnprocessableEntityException('لا يمكن حفظ المستخدم');
    }
  }
}
