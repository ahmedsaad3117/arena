import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { OtpMessageDestination } from '../enum/message-sender.enum';

export class LoginOrSignupDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsOptional()
  @IsNumberString()
  country_code?: string;

  @IsOptional()
  @IsNumberString()
  otp?: string;

  @IsNotEmpty()
  @IsEnum(OtpMessageDestination)
  otp_destination: OtpMessageDestination;
}
