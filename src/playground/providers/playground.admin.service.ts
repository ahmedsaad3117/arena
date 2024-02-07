import { Injectable } from '@nestjs/common';
import { CreatePlaygroundDto } from '../dto/create-playground.dto';
import { UpdatePlaygroundDto } from '../dto/update-playground.dto';
import { PlaygroundBaseService } from './playground.base.service';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';
import { findOneSuccessAutoTranslated } from '@app/_common/utils/successResponseMessage.util';

@Injectable()
export class PlaygroundAdminService {
  constructor(private playgroundBaseService: PlaygroundBaseService) {}
  create(createPlaygroundDto: CreatePlaygroundDto) {
    return this.playgroundBaseService.create(createPlaygroundDto);
  }

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

  update(id: number, updatePlaygroundDto: UpdatePlaygroundDto) {
    return this.playgroundBaseService.update(id, updatePlaygroundDto);
  }

  remove(id: number) {
    return this.playgroundBaseService.remove(id);
  }
}
