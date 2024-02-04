import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { UserBaseDto } from "src/_common/dtoes/create-user.dto";

export class CreateUserDto extends UserBaseDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  confirm_password: string;
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: "At least one role is required" })
  roles: Array<number>;
}
