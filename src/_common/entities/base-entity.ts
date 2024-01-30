// base.entity.ts
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: null })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deleted_at: Date;
}
