import { Playground } from '@app/playground/entities/playground.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DayOff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  reason: string;

  @Column({ type: 'time' })
  from: string;

  @Column({ type: 'time' })
  to: string;

  @OneToMany(() => Playground, (playground) => playground.dayOffs)
  @JoinColumn({ name: 'playground_id' })
  playground: Playground;

  @Column()
  playground_id: number;
}
