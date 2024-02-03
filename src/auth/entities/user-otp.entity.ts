import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_otp' })
export class UserOtp {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', default: null })
  otp: string;

  @Column({ type: 'varchar', nullable: true })
  user: string;

  @Column({ type: 'varchar', nullable: true })
  otp_destination: string;

  @Column({ type: 'varchar', nullable: true })
  country_code: string;

  @CreateDateColumn({ type: 'timestamp', default: null })
  created_at: string;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deleted_at: Date;
}
