import { IsEnum, IsInt, IsNumber, IsString, MaxLength } from 'class-validator';

enum PlaygroundType {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
  SEMI_OUTDOOR = 'semi-outdoor',
}

export class CreatePlaygroundDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEnum(PlaygroundType)
  type: PlaygroundType;

  @IsInt()
  size: number;

  @IsNumber()
  cost: number;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
