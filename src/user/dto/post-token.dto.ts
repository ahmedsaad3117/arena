import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PostTokenDto {
  @IsNotEmpty()
  @IsString()
  fcm_token: string;
}
