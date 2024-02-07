import { DayOff } from '@app/day-off/entities/day-off.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Playground {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // should be enum

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  cost: number;

  @Column()
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => DayOff, (dayOff) => dayOff.playground)
  dayOffs: DayOff[];
}
