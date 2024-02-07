import { Injectable } from '@nestjs/common';
import { CreatePlaygroundDto } from '../dto/create-playground.dto';
import { UpdatePlaygroundDto } from '../dto/update-playground.dto';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { Playground } from '../entities/playground.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';
import { findOneSuccessAutoTranslated } from '@app/_common/utils/successResponseMessage.util';

@Injectable()
export class PlaygroundBaseService extends BaseService<Playground> {
  constructor(
    @InjectRepository(Playground)
    playgroundRepository: Repository<Playground>,
  ) {
    super(playgroundRepository);
  }
  create(createPlaygroundDto: CreatePlaygroundDto) {
    return this.createAndSaveEntity(createPlaygroundDto);
  }

  findAll(
    pageOptionsDto: PageOptionsDto,
    // filterPlaygroundDto: FilterPlaygroundDto
  ) {
    return this.findAllEntities(pageOptionsDto);
  }

  async findOne(id: number) {
    const playground = await this.findOneEntityByIdOrFail(id);
    return findOneSuccessAutoTranslated(playground);
  }

  update(id: number, updatePlaygroundDto: UpdatePlaygroundDto) {
    return this.updateEntity(id, updatePlaygroundDto);
  }

  remove(id: number) {
    return this.removeEntity({ id });
  }
}
