import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomerService } from "../providers/customer.service";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { UserDecorator } from "src/_common/decorators/getLoggedInUser.decorator";
import { CustomerAddressService } from "../providers/address.service";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { CustomerEntity } from "../entities/customer.entity";

@Controller("customer/profile")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerAddressService: CustomerAddressService
  ) {}

  @Get()
  findProfile(@UserDecorator("id") id: number) {
    return this.customerService.findProfile(id);
  }

  @Patch()
  update(
    @UserDecorator("id") id: number,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete()
  remove(@UserDecorator("id") id: number) {
    return this.customerService.remove(+id);
  }
}
