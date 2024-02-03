import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidationArguments,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class LoginDto {
  @IsNotEmpty({ message: i18nValidationMessage("validations.NOT_EMPTY") })
  @IsString({ message: i18nValidationMessage("validations.SHOULD_BE_STRING") })
  readonly user: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
