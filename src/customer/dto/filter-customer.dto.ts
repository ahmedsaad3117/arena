import { IsEnum, IsOptional, IsString } from "class-validator";
import { OrderByCreatedAt } from "src/_common/enums/order-by.enum";
import { UserStatusEnum } from "src/_common/enums/user_status.enum";

export class FilterCustomerDto {
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(OrderByCreatedAt)
  orderBy: OrderByCreatedAt;
}
