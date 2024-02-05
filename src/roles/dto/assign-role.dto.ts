import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class AssignRoleToUser {
  @IsNotEmpty()
  @IsNumber()
  @Transform((value) => parseInt(value.value))
  readonly user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((value) => parseInt(value.value))
  readonly role_id: number;
}
