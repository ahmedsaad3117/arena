// base.entity.ts
import { Column, BeforeInsert, OneToMany, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { BaseUserEntity } from 'src/_common/entities/base-user-entity';
import { UserToRole } from 'src/_manyToMany/userToRole.entity';
import { Reservation } from '@app/reservation/entities/reservation.entity';

@Entity('users')
export class UserEntity extends BaseUserEntity {
  //----------------------- additional props ------------------------------------------------------------
  @Column({ type: 'varchar', default: null })
  @Exclude()
  password: string;

  //--------------------------- relations
  @OneToMany(() => UserToRole, (userToRole) => userToRole.user)
  userToRole: UserToRole[];

  @OneToMany(() => Reservation, (reservation) => reservation.playground)
  reservations: Reservation[];
  //----------------------------- methods

  async isCorrectPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  //----------------------------- Entity Hooks ---------------------------------------------------
  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
}
