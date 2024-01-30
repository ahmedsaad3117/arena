// base.entity.ts
import { Column, BeforeInsert, AfterLoad } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { BaseEntity } from "./base-entity";
import { Exclude } from "class-transformer";
import Config from "../config/config";
import { UserStatusEnum } from "../enums/user_status.enum";
import { prefixImageWithServer } from "../utils/prefixAssetWithServer.util";

export class BaseUserEntity extends BaseEntity {
  @Column({ type: "varchar", default: null })
  name: string;

  @Column({ type: "varchar", default: null })
  phone: string;
  @Column({ type: "varchar", default: null })
  country_code: string;
  @Column({ type: "varchar", default: null })
  email: string;

  @Column({ type: "varchar", default: null })
  address: string;

  @Column({ type: "varchar", default: null })
  avatar: string;

  @Column({ type: "varchar", default: null })
  fcm_token: string;

  // every login with otp
  // this status is for admin to active or block customer or employee
  @Column({
    type: "varchar",
    default: "deactive",
  })
  status: UserStatusEnum;

  async generateToken() {
    const { id, email } = this;
    const token = jwt.sign({ id, email }, Config.JWT_SECRET);
    return token;
  }

  //------------------------------------------------------ Hooks
  @AfterLoad()
  prefixImageWithServer() {
    this.avatar = prefixImageWithServer(this.avatar);
  }
}
