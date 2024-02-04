import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CustomerService } from "../providers/customer.service";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { FilterCustomerDto } from "../dto/filter-customer.dto";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";
import { FilteredQuery } from "src/_common/decorators/query.decorator";
import { UserStatusEnum } from "src/_common/enums/user_status.enum";
import { BlockCustomerDto } from "../dto/block-customer.dto";

@Controller("admin/customer")
export class CustomerAdminController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() @FilteredQuery() filterCustomerDto: FilterCustomerDto
  ) {
    return this.customerService.findAll(pageOptionsDto, filterCustomerDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }
  @Post("block/:id")
  block(@Param("id") id: string, @Body() blockCustomerDto: BlockCustomerDto) {
    let updateCustomerDto: UpdateCustomerDto = {
      status: blockCustomerDto.status,
    };
    return this.customerService.update(+id, updateCustomerDto);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerService.remove(+id);
  }
}
