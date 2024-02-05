import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BulkAssignRole {
  @IsOptional()
  @IsNumber()
  @Transform((value) => parseInt(value.value))
  user_id: number;

  @IsOptional()
  @IsArray()
  roles: Array<number>;
}
