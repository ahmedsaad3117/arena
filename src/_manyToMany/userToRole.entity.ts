import { Permission } from "src/permissions/entities/permission.entity";
import { Role } from "src/roles/entities/role.entity";
import { UserEntity } from "src/user/entities/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user_role" })
export class UserToRole {
  @PrimaryGeneratedColumn()
  id: number;

  /*   @Column()
  user_id: number;

  @Column()
  role_id: number; */
  @ManyToOne(() => UserEntity, (user) => user.userToRole)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
  @ManyToOne(() => Role, (role) => role.userToRole)
  @JoinColumn({ name: "role_id" })
  role: Role;
}
