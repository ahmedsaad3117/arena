import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  block: string;

  @IsNotEmpty()
  @IsString()
  avenue: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsOptional()
  @IsString()
  floor: string;

  @IsOptional()
  @IsString()
  apartment: string;

  @IsOptional()
  @IsString()
  comment: string;
}
