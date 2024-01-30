import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception";
import { requiredPermissionKey } from "../decorators/canDoThis.decorator";
import { Permission } from "src/permissions/entities/permission.entity";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string>(
      requiredPermissionKey,
      [context.getHandler(), context.getClass()]
    );
    const request = context.switchToHttp().getRequest();
    const user = request["user"];

    if (!requiredPermission)
      // means that there is no permission
      return true;

    if (!user) throw new ForbiddenException(`You should be logged in`);
    if (user["permissions"].length == 0)
      throw new ForbiddenException(`You don't have any permissions yet`);
    // if user not mapped uncomment this
    /*   const isUserRoleContainsPermission = user['userToRole'].some(({ role }) => {
      const { roleToPermission } = role;

      for (let permissionEl of roleToPermission) {
        const { permission } = permissionEl;

        if (permission.slug === requiredPermission) {
          return true; // Found the required permission
        }
      }

      return false; // Required permission not found in this role
    }); */
    console.log("required permission", requiredPermission);
    console.log("required permission", user["permissions"]);

    const isUserRoleContainsPermission = user["permissions"].find(
      (permission: Permission) => permission.slug == requiredPermission
    );
    if (!isUserRoleContainsPermission)
      throw new ForbiddenException(
        `Sorry! you don't have permission : ${requiredPermission}`
      );

    console.log("user has this permission", requiredPermission);

    return true;
  }
}
