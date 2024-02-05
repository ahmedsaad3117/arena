import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PermissionsService } from "../providers/permissions.service";
import { CanDoThis } from "src/_common/decorators/canDoThis.decorator";
import { AssignPermissionToRole } from "../dto/assign-permission.dto";
import { DisassociatePermissionFromRole } from "../dto/disassociate-permission.dto";
import { BulkAssignPermission } from "../dto/bulk-assign.dto";

@Controller("admin/permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @CanDoThis("permissions:find")
  findAll() {
    return this.permissionsService.findAll();
  }

  @Post("/assign-permission")
  @CanDoThis("permissions:assign")
  assignPermissionToRole(
    @Body() assignPermissionToRole: AssignPermissionToRole
  ) {
    return this.permissionsService.assignPermissionToRole(
      assignPermissionToRole
    );
  }
  @Post("/bulk-assign")
  //@CanDoThis('permissions:disassociate')
  bulkAssignPermissionToRole(
    @Body() bulkAssignPermission: BulkAssignPermission
  ) {
    return this.permissionsService.bulkAssignPermissionToRole(
      bulkAssignPermission
    );
  }

  @Post("/disassociate-permission")
  @CanDoThis("permissions:disassociate")
  disassociatePermissionFromRole(
    @Body() disassociatePermissionFromRole: DisassociatePermissionFromRole
  ) {
    return this.permissionsService.disassociatePermissionFromRole(
      disassociatePermissionFromRole
    );
  }
}
