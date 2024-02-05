import { RoleToPermission } from 'src/_manyToMany/roleToPermission.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  action: string;
  @ManyToMany(
    () => RoleToPermission,
    (roleToPermission) => roleToPermission.permission,
  )
  roleToPermission: RoleToPermission[];
}
