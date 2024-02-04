import { IsEnum, IsNotEmpty } from "class-validator";
import { UserStatusEnum } from "src/_common/enums/user_status.enum";

export class BlockCustomerDto {
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;
}
