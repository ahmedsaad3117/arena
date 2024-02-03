import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VerifyOtpDto } from "../dto/verify-otp.dto";

import { LoginOrSignupDto } from "../dto/login-or-signup.dto";
import { UserOtp } from "../entities/user-otp.entity";
import { translateThis } from "src/_common/utils/translate-this";
import { OtpMessageDestination } from "../enum/message-sender.enum";
import { genRandomOtp } from "src/_common/utils/random/generateRandomOtp";

@Injectable()
export class UserOtpService {
  // TODO: send cart with logon and in cart send produc id
  constructor(
    @InjectRepository(UserOtp)
    private otpRepository: Repository<UserOtp>
  ) {}
  async createOtp(loginOrSignupDto: LoginOrSignupDto) {
    let { user, country_code, otp_destination } = loginOrSignupDto;
    let query = { otp_destination, user };
    console.log("otp_destination", otp_destination);

    if (otp_destination == OtpMessageDestination.PHONE) {
      query["country_code"] = country_code;
    }
    await this.otpRepository.delete(query);
    const otp: string = genRandomOtp();
    console.log(`otp of email : ${user} is : ${otp}`);

    try {
      await this.otpRepository.save({ otp, ...query });
      return otp;
    } catch (error) {
      throw new UnprocessableEntityException(error.message || "Can't save otp");
    }
  }

  async verifyOtp(loginOrSignupDto: LoginOrSignupDto) {
    let { user, otp, country_code, otp_destination } = loginOrSignupDto;
    let query = { otp_destination, user };
    if (otp_destination == OtpMessageDestination.PHONE) {
      query["country_code"] = country_code;
    }
    const savedOtp = await this.otpRepository.findOne({
      where: query,
    });
    if (!savedOtp) return false;

    if (savedOtp.otp != otp) {
      let message = translateThis("auth.invalid_otp");
      throw new UnauthorizedException(message);
    }

    // await this.otpRepository.delete({ id: savedOtp.id });
    return savedOtp.otp == otp;
  }
}
