import { generateSlugHelper } from "src/_common/utils/genSlug";
import { RoleToPermission } from "src/_manyToMany/roleToPermission.entity";
import { UserToRole } from "src/_manyToMany/userToRole.entity";
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { UserRequest } from "src/_common/classes/static-user-request.class";

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //@Exclude()
  name_en: string;

  @Column()
  //@Exclude()
  name_ar: string;

  @Expose()
  name: string;

  @AfterLoad()
  setName() {
    this.name = this[`name_${UserRequest.getLang()}`];
  }

  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "text", default: null })
  description: string;

  @OneToMany(
    () => RoleToPermission,
    (roleToPermission) => roleToPermission.role
  )
  roleToPermission: RoleToPermission[];
  @OneToMany(() => UserToRole, (userToRole) => userToRole.role)
  userToRole: UserToRole[];

  @CreateDateColumn({ type: "timestamp", default: null })
  created_at: string;

  @UpdateDateColumn({ type: "timestamp", default: null })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", default: null })
  deleted_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = generateSlugHelper(this.name_en);
  }
}
