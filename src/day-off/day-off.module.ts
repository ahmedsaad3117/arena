import { Module } from '@nestjs/common';
import { DayOffService } from './providers/day-off.service';
import { DayOffController } from './controllers/day-off.controller';

@Module({
  controllers: [DayOffController],
  providers: [DayOffService],
})
export class DayOffModule {}
