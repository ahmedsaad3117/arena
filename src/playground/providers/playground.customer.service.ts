import { Injectable } from '@nestjs/common';
import { CreatePlaygroundDto } from '../dto/create-playground.dto';
import { UpdatePlaygroundDto } from '../dto/update-playground.dto';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { Playground } from '../entities/playground.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';
import { findOneSuccessAutoTranslated } from '@app/_common/utils/successResponseMessage.util';
import { PlaygroundBaseService } from './playground.base.service';

@Injectable()
export class PlaygroundCustomerService {
  constructor(private playgroundBaseService: PlaygroundBaseService) {}
  findAll(
    pageOptionsDto: PageOptionsDto,
    // filterPlaygroundDto: FilterPlaygroundDto
  ) {
    return this.playgroundBaseService.findAll(pageOptionsDto);
  }

  async findOne(id: number) {
    const playground = await this.playgroundBaseService.findOne(id);
    return findOneSuccessAutoTranslated(playground);
  }
}
