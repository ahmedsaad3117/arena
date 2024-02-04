import { PartialType } from "@nestjs/swagger";
import { CreateCustomerDto } from "./create-customer.dto";
import { CreateAddressDto } from "./create-address.dto";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
