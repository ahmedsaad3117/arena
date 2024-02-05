import { Module, forwardRef } from "@nestjs/common";
import { RolesService } from "./providers/roles.service";
import { RolesController } from "./controllers/roles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { UserToRole } from "src/_manyToMany/userToRole.entity";
import { PermissionsModule } from "src/permissions/permissions.module";
import { UsersOthersUsersService } from "./providers/role.other.users.service";
import { UsersModule } from "src/user/users.module";
import { UserEntity } from "src/user/entities/users.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, UserToRole, UserEntity]),
    forwardRef(() => UsersModule),
    PermissionsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, UsersOthersUsersService],
  exports: [RolesService],
})
export class RolesModule {}
