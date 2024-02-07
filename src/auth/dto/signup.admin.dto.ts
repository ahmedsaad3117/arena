import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoginOrSignupDto } from './login-or-signup.dto';

export class SignupAdminDto extends LoginOrSignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
