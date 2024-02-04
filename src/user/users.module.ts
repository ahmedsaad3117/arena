import { Module, forwardRef } from "@nestjs/common";
import { UsersAdminService } from "./providers/users.admin.service";
import { UsersAdminController } from "./controllers/users.admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/users.entity";
import { UsersBaseService } from "./providers/users.base.service";
import { RolesModule } from "src/roles/roles.module";
import { UserController } from "./controllers/users.controller";
import { UsersProfileService } from "./providers/users.profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RolesModule],
  controllers: [UsersAdminController, UserController],
  providers: [UsersAdminService, UsersBaseService, UsersProfileService],
  exports: [UsersBaseService],
})
export class UsersModule {}
