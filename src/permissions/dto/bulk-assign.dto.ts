import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BulkAssignPermission {
  @IsOptional()
  @IsNumber()
  @Transform((value) => parseInt(value.value))
  role_id: number;

  @IsOptional()
  @IsArray()
  permissions: Array<number>;
}
