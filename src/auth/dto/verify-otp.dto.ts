import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { AppUserType } from "src/_common/enums/app_user_types.enum";
import { OtpTypesEnum } from "src/_common/enums/otp_types.enum";

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  destination_type: string = AppUserType.CUSTOMER;

  @IsOptional()
  @IsString()
  otp_type: string = OtpTypesEnum.REGISTRATION_OTP;

  @IsNotEmpty()
  @IsString()
  readonly otp: string;
}
