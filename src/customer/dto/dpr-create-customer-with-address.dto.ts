// src/dto/signup.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  block: string;

  @IsNotEmpty()
  avenue: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  houseNumber: string;

  @IsOptional()
  floor: string;

  @IsOptional()
  apartment: string;
}
