import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CustomerAddressService } from "../providers/address.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UserDecorator } from "src/_common/decorators/getLoggedInUser.decorator";
import { CustomerEntity } from "../entities/customer.entity";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";

@Controller("customer/shipping-address")
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService
  ) {}

  @Get()
  getAddress(
    @UserDecorator("id") id: number,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    return this.customerAddressService.findAddresses(id, pageOptionsDto);
  }

  @Post()
  create(
    @UserDecorator() customer: CustomerEntity,
    @Body() createAddressDto: CreateAddressDto
  ) {
    return this.customerAddressService.create(customer, createAddressDto);
  }

  @Patch(":id")
  update(
    @UserDecorator() customer: CustomerEntity,
    @Body() createAddressDto: CreateAddressDto,
    @Param("id") id: number
  ) {
    return this.customerAddressService.update(customer, createAddressDto, id);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerAddressService.remove(+id);
  }
}
