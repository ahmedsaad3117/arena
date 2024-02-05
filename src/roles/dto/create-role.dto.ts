import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly name_en: string;

  @IsNotEmpty()
  @IsString()
  readonly name_ar: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: "At least one permission is required" })
  permissions: number[];
}
