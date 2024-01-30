import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserStatusEnum } from "../enums/user_status.enum";

export class UserBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  country_code: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  status: UserStatusEnum;

  @IsOptional()
  @IsString()
  fcm_token: string;
}
