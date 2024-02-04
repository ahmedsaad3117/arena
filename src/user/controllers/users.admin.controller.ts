import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersAdminService } from "../providers/users.admin.service";
import { FilterUserDto } from "../dto/filter-user.dto";
import { CanDoThis } from "src/_common/decorators/canDoThis.decorator";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";

@Controller("admin/users")
export class UsersAdminController {
  constructor(private readonly usersService: UsersAdminService) {}

  @Post()
  @CanDoThis("users:create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CanDoThis("users:find")
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filterUserDto: FilterUserDto
  ) {
    return this.usersService.findAll(pageOptionsDto, filterUserDto);
  }

  @Get(":id")
  @CanDoThis("users:findOne")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOnePopulated(id);
  }

  @Patch(":id")
  @CanDoThis("users:update")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @CanDoThis("users:delete")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
