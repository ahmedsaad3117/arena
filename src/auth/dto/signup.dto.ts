import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LoginOrSignupDto } from "./login-or-signup.dto";

export class SignupDto extends LoginOrSignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;
}