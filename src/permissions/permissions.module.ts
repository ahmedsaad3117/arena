import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './providers/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleToPermission } from 'src/_manyToMany/roleToPermission.entity';
import { Permission } from './entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsOthersRolesService } from './providers/permissions.other.roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleToPermission, Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsOthersRolesService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
