import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from "@nestjs/common";
import { RolesService } from "../providers/roles.service";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { CanDoThis } from "src/_common/decorators/canDoThis.decorator";
import { Public } from "src/_common/decorators/public.decorator";
import { AssignRoleToUser } from "../dto/assign-role.dto";
import { DisassociateRoleFromUser } from "../dto/disassociate-role.dto";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";

@Controller("admin/roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @CanDoThis("roles:create")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  //@Public()
  @CanDoThis("roles:find")
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.rolesService.findAll(pageOptionsDto);
  }

  @Get(":id")
  @CanDoThis("roles:findOne")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOneForController(+id);
  }

  @Patch(":id")
  @CanDoThis("roles:update")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }
  @Post("/assign-role")
  @CanDoThis("roles:assign")
  assignRoleToUser(@Body() assignRoleToUser: AssignRoleToUser) {
    return this.rolesService.assignRoleToUser(assignRoleToUser);
  }

  @HttpCode(200)
  @Post("/disassociate-role")
  @CanDoThis("roles:disassociate")
  disassociateRoleFromUser(
    @Body() disassociateRoleFromUser: DisassociateRoleFromUser
  ) {
    return this.rolesService.disassociateRoleFromUser(disassociateRoleFromUser);
  }

  @Delete(":id")
  @CanDoThis("roles:soft_delete")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.remove(+id);
  }

  @Delete("/force-delete/:id")
  @CanDoThis("roles:force_delete")
  hardDelete(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.remove(+id);
  }
}
