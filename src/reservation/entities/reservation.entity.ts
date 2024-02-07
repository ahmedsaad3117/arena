import { Playground } from '@app/playground/entities/playground.entity';
import { UserEntity } from '@app/user/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Playground, (playground) => playground.reservations)
  @JoinColumn({ name: 'playground_id' })
  playground: Playground;

  @Column()
  playground_id: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
