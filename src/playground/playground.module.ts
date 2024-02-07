import { Module } from '@nestjs/common';
import { PlaygroundAdminService } from './providers/playground.admin.service';
import { PlaygroundCustomerController } from './controllers/playground.customer.controller';
import { PlaygroundCustomerService } from './providers/playground.customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playground } from './entities/playground.entity';
import { PlaygroundBaseService } from './providers/playground.base.service';
import { PlaygroundAdminController } from './controllers/playground.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playground])],
  controllers: [PlaygroundCustomerController, PlaygroundAdminController],
  providers: [
    PlaygroundAdminService,
    PlaygroundCustomerService,
    PlaygroundBaseService,
  ],
})
export class PlaygroundModule {}
