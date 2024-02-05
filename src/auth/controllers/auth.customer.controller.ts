import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { AdminAuthService } from '../services/auth.admin.service';
import { LoginDto } from '../dto/login.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { Public } from 'src/_common/decorators/public.decorator';
import { UsersBaseService } from 'src/user/providers/users.base.service';
import { UserDecorator } from 'src/_common/decorators/getLoggedInUser.decorator';
import { LoginOrSignupDto } from '../dto/login-or-signup.dto';
import { CustomerAuthService } from '../services/auth.customer.service';
import { SignupDto } from '../dto/signup.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('customer')
export class CustomerAuthController {
  constructor(private readonly authCustomerService: CustomerAuthService) {}

  @Post('signup')
  @Public()
  signup(@Body() signupDto: SignupDto) {
    return this.authCustomerService.loginOrSignup(signupDto);
  }
  @Post('login')
  @Public()
  login(@Body() loginOrSignupDto: LoginOrSignupDto) {
    return this.authCustomerService.loginOrSignup(loginOrSignupDto);
  }

  @Post('login-or-signup')
  @Public()
  @HttpCode(200)
  loginOrSignup(@Body() loginOrSignupDto: LoginOrSignupDto) {
    return this.authCustomerService.loginOrSignup(loginOrSignupDto);
  }

  @Post(['verify-login', 'verify-signup'])
  @Public()
  @HttpCode(200)
  verifyLogin(@Body() loginOrSignupDto: LoginOrSignupDto) {
    return this.authCustomerService.verifyLoginOrSignup(loginOrSignupDto);
  }
}
